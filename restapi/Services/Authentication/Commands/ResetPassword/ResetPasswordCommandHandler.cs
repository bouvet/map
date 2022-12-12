using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using restapi.Common.Services.Auth;
using restapi.Common.Services.Emails;
using restapi.Common.Settings;
using restapi.Data;

namespace restapi.Services.Authentication.Commands.ResetPassword;

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, ErrorOr<Success>>
{
  private readonly DataContext dataContext;
  private readonly IEmailService emailService;
  private readonly IJwtGenerator jwtGenerator;
  private readonly SendGridSettings sendGridSettings;

  public ResetPasswordCommandHandler(
    DataContext dataContext,
    IEmailService emailService,
    IJwtGenerator jwtGenerator,
    IOptions<SendGridSettings> sendGridOptions)
  {
    this.dataContext = dataContext;
    this.emailService = emailService;
    this.jwtGenerator = jwtGenerator;
    sendGridSettings = sendGridOptions.Value;
  }

  public async Task<ErrorOr<Success>> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
  {
    var user = await dataContext.Users.SingleOrDefaultAsync(user => user.Email.ToLower() == request.Email, cancellationToken: cancellationToken);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    var token = jwtGenerator.GenerateResetPasswordToken(user);

    var sendEmailRequest = new SendEmailRequest(
      "Tilbakestill passord",
      user.Email,
      $"{user.FirstName} {user.LastName}",
      $"{sendGridSettings.FrontendUri}/reset-password?token={token}",
      $@"
        <h2>Tilbakestill passord link</h2>
        <p>Trykk på lenken under for å sette nytt passord</p>
        <a href=""{sendGridSettings.FrontendUri}/reset-password?token={token}"">
          Sett nytt passord
        </a>
        <br>
        <p>Lenken er gyldig i 10 minutter, etter det må du be om ny lenke</p>
      "
    );

    ErrorOr<SendGrid.Response> sendMailResult = await emailService.SendEmail(sendEmailRequest);

    if (sendMailResult.IsError)
    {
      return Errors.EmailService.SendingEmailFailed;
    }

    return Result.Success;
  }
}
