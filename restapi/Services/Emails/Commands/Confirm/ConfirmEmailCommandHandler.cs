using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Data;
using restapi.Services.Emails.Common;

namespace restapi.Services.Emails.Commands.Confirm;

public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, ErrorOr<EmailResult>>
{
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;

  public ConfirmEmailCommandHandler(DataContext dataContext, IDateTimeProvider dateTimeProvider)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
  }

  public async Task<ErrorOr<EmailResult>> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
  {
    var email = await dataContext.Emails.SingleOrDefaultAsync(email => email.Address.ToLower() == request.Address, cancellationToken: cancellationToken);

    if (email is null)
    {
      return Errors.EmailService.NotFound;
    }

    if (email.ConfirmationCode != request.ConfirmationCode)
    {
      return Errors.EmailService.WrongConfirmationCode;
    }

    if (email.CodeValidTo < dateTimeProvider.UtcNow)
    {
      return Errors.EmailService.CodeExpired;
    }

    email.Confirmed = true;
    email.Updated = dateTimeProvider.UtcNow;

    await dataContext.SaveChangesAsync(cancellationToken);

    return new EmailResult(email);
  }
}
