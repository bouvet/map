using System.Net.Http.Headers;
using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.Settings;
using restapi.Data;
using restapi.Entities;
using restapi.Services.Emails.Commands.Create;
using restapi.Services.Emails.Commands.ResendCode;

namespace restapi.Services.Authentication.Commands.AuthWithCode;

public class AuthWithCodeCommandHandler : IRequestHandler<AuthWithCodeCommand, ErrorOr<AuthWithCodeResult>>
{
  private readonly IHttpClientFactory clientFactory;
  private readonly GoogleAuthSettings googleAuthSettings;
  private readonly DataContext dataContext;
  private readonly IJwtGenerator jwtGenerator;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly ISender mediator;

  public AuthWithCodeCommandHandler(IHttpClientFactory clientFactory, IOptions<GoogleAuthSettings> googleAuthOptions, DataContext dataContext, IJwtGenerator jwtGenerator, IDateTimeProvider dateTimeProvider, ISender mediator)
  {
    this.clientFactory = clientFactory;
    googleAuthSettings = googleAuthOptions.Value;
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
    this.dateTimeProvider = dateTimeProvider;
    this.mediator = mediator;
  }

  public async Task<ErrorOr<AuthWithCodeResult>> Handle(AuthWithCodeCommand request, CancellationToken cancellationToken)
  {
    ErrorOr<GoogleAuthResponse> authResponse = await ValidateGoogleCode(request.Code, cancellationToken);

    if (authResponse.IsError)
    {
      return authResponse.Errors;
    }

    ErrorOr<GoogleUserInfoResponse> userInfoResponse = await GetGoogleUserInfo(authResponse.Value.Access_token, cancellationToken);

    if (userInfoResponse.IsError)
    {
      return userInfoResponse.Errors;
    }

    var user = await dataContext.Users.SingleOrDefaultAsync(user => user.Email.ToLower() == userInfoResponse.Value.Email, cancellationToken: cancellationToken);

    // User has an account and is logging in:

    if (user is not null)
    {
      var userToken = jwtGenerator.GenerateUserToken(user);

      user.AccessToken = authResponse.Value.Access_token;
      user.RefreshToken = authResponse.Value.Refresh_token;
      user.AuthenticationMethod = "Google";
      user.Updated = dateTimeProvider.CEST;

      await dataContext.SaveChangesAsync(cancellationToken);

      return new AuthWithCodeResult(user, null, userToken, true, false, true);
    }

    // User does not have an account and not verified email with google:

    if (!userInfoResponse.Value.Verified_email)
    {
      var emailFromGoogle = userInfoResponse.Value.Email.ToLower();

      var email = await dataContext.Emails.SingleOrDefaultAsync(email => email.Address.ToLower() == emailFromGoogle, cancellationToken: cancellationToken);

      if (email is null)
      {
        var createEmailCommand = new CreateEmailCommand(emailFromGoogle);

        ErrorOr<CreateEmailResult> createEmailResult = await mediator.Send(createEmailCommand, cancellationToken);

        if (createEmailResult.IsError)
        {
          return createEmailResult.Errors;
        }

        return new AuthWithCodeResult(null, createEmailResult.Value.Id, createEmailResult.Value.Token, false, true, false);
      }

      var resendCodeCommand = new ResendCodeCommand(email.Id);

      ErrorOr<CreateEmailResult> resendCodeResult = await mediator.Send(resendCodeCommand, cancellationToken);

      if (resendCodeResult.IsError)
      {
        return resendCodeResult.Errors;
      }

      return new AuthWithCodeResult(null, resendCodeResult.Value.Id, resendCodeResult.Value.Token, false, true, false);
    }

    // User does not have an account but has a verified email with google:

    var randomNumberGenerator = new Random();
    var randomNumber = randomNumberGenerator.Next(100000, 999999);

    var newEmail = new Email
    {
      Id = Guid.NewGuid(),
      Address = userInfoResponse.Value.Email.ToLower(),
      ConfirmationCode = randomNumber,
      Confirmed = true,
      Created = dateTimeProvider.CEST,
      CodeValidTo = dateTimeProvider.UtcNow.AddHours(48)
    };

    var token = jwtGenerator.GenerateRegistrationToken(newEmail);

    dataContext.Emails.Add(newEmail);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new AuthWithCodeResult(null, newEmail.Id, token, false, true, true);
  }

  private async Task<ErrorOr<GoogleAuthResponse>> ValidateGoogleCode(string Code, CancellationToken cancellationToken)
  {
    var client = clientFactory.CreateClient("ValidateGoogleCode");

    var endpoint = $"?client_id={googleAuthSettings.ClientId}&client_secret={googleAuthSettings.ClientSecret}&redirect_uri={googleAuthSettings.RedirectUri}&grant_type=authorization_code&code={Code}";

    var authResponse = await client.PostAsync(endpoint, null, cancellationToken);

    var googleAuthResponse = await authResponse.Content.ReadFromJsonAsync<GoogleAuthResponse>(cancellationToken: cancellationToken);

    if (googleAuthResponse is null)
    {
      return Errors.Authentication.Unauthorized;
    }

    return googleAuthResponse;
  }

  private async Task<ErrorOr<GoogleUserInfoResponse>> GetGoogleUserInfo(string AccessToken, CancellationToken cancellationToken)
  {
    var client = clientFactory.CreateClient();

    using var requestMessage = new HttpRequestMessage(HttpMethod.Get, GoogleAuthSettings.UserInfoUri);

    requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);

    HttpResponseMessage userInfoResponse = await client.SendAsync(requestMessage, cancellationToken);

    var googleUserInfoResponse = await userInfoResponse.Content.ReadFromJsonAsync<GoogleUserInfoResponse>(cancellationToken: cancellationToken);

    if (googleUserInfoResponse is null)
    {
      return Errors.Authentication.Unauthorized;
    }

    return googleUserInfoResponse;
  }
}