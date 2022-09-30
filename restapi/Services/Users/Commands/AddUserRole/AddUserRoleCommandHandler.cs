using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Services.Users.Common;

namespace restapi.Services.Users.Commands.AddUserRole;

public class AddUserRoleCommandHandler : IRequestHandler<AddUserRoleCommand, ErrorOr<UserResult>>
{
  private readonly DataContext dataContext;

  public AddUserRoleCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<UserResult>> Handle(AddUserRoleCommand request, CancellationToken cancellationToken)
  {
    var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    var role = await dataContext.Roles.FindAsync(new object?[] { request.RoleId }, cancellationToken: cancellationToken);

    if (role is null)
    {
      return Errors.Role.NotFound;
    }

    foreach (var userRole in user.Roles)
    {
      if (userRole.Id == role.Id)
      {
        return Errors.User.RoleAlreadyAdded;
      }
    }

    user.Roles.Add(role);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new UserResult(user);
  }
}
