using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Data;

namespace restapi.Services.Users.Commands.ConfirmEmail;

public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, ErrorOr<string>>
{
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly IJwtGenerator jwtGenerator;

  public ConfirmEmailCommandHandler(DataContext dataContext, IDateTimeProvider dateTimeProvider, IJwtGenerator jwtGenerator)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
    this.jwtGenerator = jwtGenerator;
  }

  public async Task<ErrorOr<string>> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
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

    if (email.Confirmed)
    {
      return Errors.EmailService.CodeConfirmed;
    }

    email.Confirmed = true;
    email.Updated = dateTimeProvider.UtcNow;

    await dataContext.SaveChangesAsync(cancellationToken);

    return jwtGenerator.GenerateUserToken(user);
  }
}
