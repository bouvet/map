using ErrorOr;
using MediatR;
using restapi.Data;

namespace restapi.Services.Roles.Commands.Delete;

public class DeleteRoleCommandHandler : IRequestHandler<DeleteRoleCommand, ErrorOr<Deleted>>
{
  private readonly DataContext dataContext;

  public DeleteRoleCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
  {
    var role = await dataContext.Roles.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (role is null)
    {
      return Errors.Role.NotFound;
    }

    dataContext.Remove(role);
    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Deleted;
  }
}
