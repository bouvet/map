using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Entities;

namespace restapi.Services.Emails.Commands.Delete;

public class DeleteEmailCommandHandler : IRequestHandler<DeleteEmailCommand, ErrorOr<Deleted>>
{
  private readonly DataContext dataContext;

  public DeleteEmailCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteEmailCommand request, CancellationToken cancellationToken)
  {
    var emailId = string.IsNullOrEmpty(request.EmailId) ? Guid.NewGuid() : Guid.Parse(request.EmailId);

    var emailById = await dataContext.Emails.FindAsync(new object?[] { emailId }, cancellationToken: cancellationToken);

    var email = new Email();

    if (emailById is null && request.IsAdmin)
    {
      email = await dataContext.Emails.SingleOrDefaultAsync(email => email.Address.ToLower() == request.Email, cancellationToken: cancellationToken);
    }

    if (emailById is null && email is null)
    {
      return Errors.EmailService.NotFound;
    }

    if (emailById is not null && emailById.Confirmed)
    {
      return Errors.EmailService.CodeConfirmed;
    }

    if (email is not null && email.Confirmed)
    {
      return Errors.EmailService.CodeConfirmed;
    }

    if (emailById is not null)
    {
      dataContext.Remove(emailById);
    }

    if (email is not null && email.Address is not null)
    {
      dataContext.Remove(email);
    }

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Deleted;
  }
}
