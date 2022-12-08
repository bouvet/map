using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.Services.Emails;
using restapi.Common.Settings;
using restapi.Data;

namespace restapi.Services.Users.Commands.ChangeEmail;

public class ChangeEmailCommandHandler : IRequestHandler<ChangeEmailCommand, ErrorOr<Updated>>
{
  private readonly DataContext dataContext;
  private readonly IEmailService emailService;
  private readonly IJwtGenerator jwtGenerator;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly SendGridSettings sendGridSettings;

  public ChangeEmailCommandHandler(
    DataContext dataContext,
    IEmailService emailService,
    IJwtGenerator jwtGenerator,
    IDateTimeProvider dateTimeProvider,
    IOptions<SendGridSettings> sendGridOptions)
  {
    this.dataContext = dataContext;
    this.emailService = emailService;
    this.jwtGenerator = jwtGenerator;
    this.dateTimeProvider = dateTimeProvider;
    sendGridSettings = sendGridOptions.Value;
  }

  public async Task<ErrorOr<Updated>> Handle(ChangeEmailCommand request, CancellationToken cancellationToken)
  {
    var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    var email = await dataContext.Emails.SingleOrDefaultAsync(email => email.Address == user.Email, cancellationToken: cancellationToken);

    if (email is null)
    {
      return Errors.EmailService.NotFound;
    }

    var token = jwtGenerator.GenerateChangeEmailToken(user, request.Email);

    var emailRequest = new SendEmailRequest(
      "Bekreft e-posten din",
      request.Email,
      $"{user.FirstName} {user.LastName}",
      "Bekreft e-posten din",
      $@"
      <h1>Hei {user.FirstName} {user.LastName},</h1>
      <p>Du har bedt om å endre e-posten din.</p>
      <p>For å bekrefte e-posten din vennligst trykk på lenken under</p>
      <p><a href=""{sendGridSettings.FrontendUri}/confirm-email?token={token}"">Bekreft e-post</a></p>
      <p>Lenken er gyldig i 48 timer, etter det må du be om ny lenke</p>
      "
    );

    ErrorOr<SendGrid.Response> emailResult = await emailService.SendEmail(emailRequest);

    if (emailResult.IsError)
    {
      return Errors.EmailService.SendingEmailFailed;
    }

    email.Address = request.Email;
    email.Confirmed = false;
    email.Updated = dateTimeProvider.UtcNow;

    user.Email = request.Email;
    user.Updated = dateTimeProvider.UtcNow;

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Updated;
  }
}
