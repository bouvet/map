using ErrorOr;
using MediatR;
using restapi.Common.Providers;
using restapi.Data;

namespace restapi.Services.Users.Commands.UpdatePassword;

public class UpdatePasswordCommandHandler : IRequestHandler<UpdatePasswordCommand, ErrorOr<Updated>>
{
  private readonly DataContext dataContext;
  private readonly IPasswordProvider passwordProvider;
  public UpdatePasswordCommandHandler(DataContext dataContext, IPasswordProvider passwordProvider)
  {
    this.dataContext = dataContext;
    this.passwordProvider = passwordProvider;
  }

  public async Task<ErrorOr<Updated>> Handle(UpdatePasswordCommand request, CancellationToken cancellationToken)
  {
    if (request.Password != request.ConfirmPassword)
    {
      return Errors.User.PasswordsDoesNotMatch;
    }

    if (string.IsNullOrEmpty(request.UserId))
    {
      return Errors.Authentication.Forbidden;
    }

    var userId = Guid.Parse(request.UserId);

    var user = await dataContext.Users.FindAsync(new object?[] { userId }, cancellationToken: cancellationToken);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    user.Password = passwordProvider.HashPassword(request.Password);

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Updated;
  }
}
