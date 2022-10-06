using ErrorOr;
using MediatR;
using restapi.Services.Users.Common;

namespace restapi.Services.Users.Commands.AddUserRole;

public record AddUserRoleCommand(
  Guid UserId,
  Guid RoleId
) : IRequest<ErrorOr<UserResult>>;