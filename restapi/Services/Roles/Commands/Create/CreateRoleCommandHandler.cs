using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Data;
using restapi.Entities;
using restapi.Services.Roles.Commands.Create;
using restapi.Services.Roles.Common;

namespace restapi.Services.Authentication.Commands.Register;

public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, ErrorOr<RoleResult>>
{
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;

  public CreateRoleCommandHandler(DataContext dataContext, IDateTimeProvider dateTimeProvider)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
  }

  public async Task<ErrorOr<RoleResult>> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
  {
    var roleAlreadyExists = await dataContext.Roles.AnyAsync(role => role.Name == request.Name, cancellationToken);

    if (roleAlreadyExists)
    {
      return Errors.Role.AlreadyExists;
    }

    var role = new Role { Name = request.Name, Created = dateTimeProvider.UtcNow };

    if (request.UserId is not null)
    {
      var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

      if (user is not null)
      {
        role.Creator = user;
      }
    }

    dataContext.Roles.Add(role);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new RoleResult(role);
  }
}