using restapi.Contracts.Roles;
using restapi.Services.Roles.Commands.Create;
using restapi.Services.Roles.Common;
using restapi.Services.Roles.Queries.GetRoleById;
using restapi.Services.Roles.Queries.GetRoles;

namespace restapi.Common.Services.Mappers.Roles;

public interface IRoleMapper
{
  CreateRoleCommand MapCreateToCommand(CreateRoleRequest request);
  GetRoleByIdQuery MapGetByIdToCommand(Guid id);
  GetRolesQuery MapGetRolesToCommand();
  List<RoleResponse> MapResultListToResponseList(List<RoleResult> resultList);
  RoleResponse MapResultToResponse(RoleResult result);
}