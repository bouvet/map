using restapi.Contracts.Roles;
using restapi.Entities;
using restapi.Services.Roles.Commands.Create;
using restapi.Services.Roles.Commands.Delete;
using restapi.Services.Roles.Common;
using restapi.Services.Roles.Queries.GetRoleById;
using restapi.Services.Roles.Queries.GetRoles;

namespace restapi.Common.Services.Mappers.Roles;

public interface IRoleMapper
{
  CreateRoleCommand MapCreateToCommand(CreateRoleRequest request, string userId);
  GetRoleByIdQuery MapGetByIdToCommand(Guid id);
  GetRolesQuery MapGetRolesToCommand();
  DeleteRoleCommand MapDeleteRole(Guid id);
  List<RoleResult> MapDbListToResultList(List<Role> roles);
  List<RoleResponse> MapDbListToResponseList(List<Role>? roles);
  List<RoleResponse> MapResultListToResponseList(List<RoleResult> resultList);
  RoleResponse MapResultToResponse(RoleResult result);
}