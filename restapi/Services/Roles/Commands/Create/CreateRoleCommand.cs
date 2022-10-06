using ErrorOr;
using MediatR;
using restapi.Services.Roles.Common;

namespace restapi.Services.Roles.Commands.Create;

public record CreateRoleCommand(string Name, Guid? UserId) : IRequest<ErrorOr<RoleResult>>;