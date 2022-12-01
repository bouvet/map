using System.Net.Mail;
using ErrorOr;
using MediatR;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.Services.Emails;
using restapi.Data;
using restapi.Services.Emails.Commands.Create;

namespace restapi.Services.Emails.Commands.ResendCode;

public class ResendCodeCommandHandler : IRequestHandler<ResendCodeCommand, ErrorOr<CreateEmailResult>>
{
  private readonly DataContext dataContext;
  private readonly IEmailService emailService;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly IJwtGenerator jwtGenerator;

  public ResendCodeCommandHandler(DataContext dataContext, IEmailService emailService, IDateTimeProvider dateTimeProvider, IJwtGenerator jwtGenerator)
  {
    this.dataContext = dataContext;
    this.emailService = emailService;
    this.dateTimeProvider = dateTimeProvider;
    this.jwtGenerator = jwtGenerator;
  }

  public async Task<ErrorOr<CreateEmailResult>> Handle(ResendCodeCommand request, CancellationToken cancellationToken)
  {
    var email = await dataContext.Emails.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (email is null)
    {
      return Errors.EmailService.NotFound;
    }

    var randomNumberGenerator = new Random();
    var randomNumber = randomNumberGenerator.Next(100000, 999999);

    var emailRequest = new SendEmailRequest(
      "Email confirmation code",
      email.Address,
      "Verden Venter",
      $"Confirmation code: {randomNumber}",
      $@"
      <h1>Takk for at du ønsker å registrere deg hos oss!</h1>
      <p>Her er din bekreftelse-kode: <strong>{randomNumber}</strong></p>
      <p>Koden er gyldig i 48 timer. Etter det må du be om ny kode.</p>
      "
    );

    ErrorOr<SendGrid.Response> emailResult = await emailService.SendEmail(emailRequest);

    if (emailResult.IsError)
    {
      return Errors.EmailService.SendingEmailFailed;
    }

    email.ConfirmationCode = randomNumber;
    email.CodeValidTo = dateTimeProvider.UtcNow.AddHours(48);
    email.Updated = dateTimeProvider.CEST;

    var token = jwtGenerator.GenerateRegistrationToken(email);

    await dataContext.SaveChangesAsync(cancellationToken);

    return new CreateEmailResult(
      email.Id,
      email.Address,
      token
    );
  }
}
