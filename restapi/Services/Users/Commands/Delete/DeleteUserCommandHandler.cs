using ErrorOr;
using MediatR;
using restapi.Common.Providers;
using restapi.Data;

namespace restapi.Services.Users.Commands.Delete;

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, ErrorOr<Deleted>>
{
  private readonly DataContext dataContext;

  public DeleteUserCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
  {
    var user = await dataContext.Users.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    dataContext.Users.Remove(user);
    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Deleted;
  }
}
