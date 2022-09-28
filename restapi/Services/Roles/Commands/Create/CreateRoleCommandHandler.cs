using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Models;
using restapi.Services.Roles.Commands.Create;
using restapi.Services.Roles.Common;
using restapi.ServiceUtils.ServiceErrors;

namespace restapi.Services.Authentication.Commands.Register;

public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, ErrorOr<RoleResult>>
{
  private readonly DataContext dataContext;

  public CreateRoleCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<RoleResult>> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
  {

    var roleAlreadyExists = await dataContext.Roles.AnyAsync(role => role.Name == request.Name, cancellationToken);

    if (roleAlreadyExists)
    {
      return Errors.Role.AlreadyExists;
    }

    var role = new Role { Name = request.Name };

    dataContext.Roles.Add(role);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new RoleResult(role);
  }
}