using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.Services.Emails;
using restapi.Data;
using restapi.Entities;

namespace restapi.Services.Emails.Commands.Create;

public class CreateEmailCommandHandler : IRequestHandler<CreateEmailCommand, ErrorOr<CreateEmailResult>>
{
  private readonly IEmailService emailService;
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly IJwtGenerator jwtGenerator;

  public CreateEmailCommandHandler(
    IEmailService emailService,
    DataContext dataContext,
    IDateTimeProvider dateTimeProvider,
    IJwtGenerator jwtGenerator)
  {
    this.emailService = emailService;
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
    this.jwtGenerator = jwtGenerator;
  }

  public async Task<ErrorOr<CreateEmailResult>> Handle(CreateEmailCommand request, CancellationToken cancellationToken)
  {
    var emailInDb = await dataContext.Emails.SingleOrDefaultAsync(email => email.Address.ToLower() == request.Email, cancellationToken: cancellationToken);
    var userExists = await dataContext.Users.AnyAsync(user => user.Email.ToLower() == request.Email, cancellationToken);

    if (emailInDb?.Confirmed == false && emailInDb.CodeValidTo > dateTimeProvider.UtcNow)
    {
      var newToken = jwtGenerator.GenerateRegistrationToken(emailInDb);
      emailInDb.CodeValidTo = dateTimeProvider.UtcNow.AddHours(48);
      await dataContext.SaveChangesAsync(cancellationToken);
      return new CreateEmailResult(
        emailInDb.Id,
        emailInDb.Address,
        emailInDb.Confirmed,
        newToken
      );
    }

    if (userExists)
    {
      return Errors.User.AlreadyExists;
    }

    if (emailInDb?.Confirmed == true)
    {
      var newToken = jwtGenerator.GenerateRegistrationToken(emailInDb);
      return new CreateEmailResult(
        emailInDb.Id,
        emailInDb.Address,
        emailInDb.Confirmed,
        newToken
      );
    }

    var randomNumberGenerator = new Random();
    var randomNumber = randomNumberGenerator.Next(100000, 999999);

    var emailRequest = new SendEmailRequest(
      "Email confirmation code",
      request.Email,
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

    var email = new Email
    {
      Id = Guid.NewGuid(),
      Address = request.Email.ToLower(),
      ConfirmationCode = randomNumber,
      Confirmed = false,
      Created = dateTimeProvider.UtcNow,
      CodeValidTo = dateTimeProvider.UtcNow.AddHours(48)
    };

    var token = jwtGenerator.GenerateRegistrationToken(email);

    dataContext.Emails.Add(email);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new CreateEmailResult(
      email.Id,
      email.Address,
      email.Confirmed,
      token
    );
  }
}
