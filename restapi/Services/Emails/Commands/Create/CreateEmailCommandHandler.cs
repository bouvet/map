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

  public CreateEmailCommandHandler(IEmailService emailService, DataContext dataContext, IDateTimeProvider dateTimeProvider, IJwtGenerator jwtGenerator)
  {
    this.emailService = emailService;
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
    this.jwtGenerator = jwtGenerator;
  }

  public async Task<ErrorOr<CreateEmailResult>> Handle(CreateEmailCommand request, CancellationToken cancellationToken)
  {
    var alreadyExists = await dataContext.Emails.AnyAsync(email => email.Address.ToLower() == request.Email, cancellationToken: cancellationToken);
    var userExists = await dataContext.Users.AnyAsync(user => user.Email.ToLower() == request.Email, cancellationToken);

    if (alreadyExists)
    {
      return Errors.EmailService.AlreadyRegistered;
    }

    if (userExists)
    {
      return Errors.Authentication.InvalidCredentials;
    }

    var randomNumberGenerator = new Random();
    var randomNumber = randomNumberGenerator.Next(100000, 999999);

    var emailRequest = new SendEmailRequest(
      "Email confirmation code",
      request.Email,
      "Verden Venter",
      $"Confirmation code: {randomNumber}",
      $@"Confirmation code: {randomNumber}
      Code is valid in 48h. After that, you will need to resend the confirmation code email."
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
      Created = dateTimeProvider.CEST,
      CodeValidTo = dateTimeProvider.UtcNow.AddHours(48)
    };

    var token = jwtGenerator.GenerateRegistrationToken(email);

    dataContext.Emails.Add(email);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new CreateEmailResult(
      email.Id,
      email.Address,
      token
    );
  }
}
