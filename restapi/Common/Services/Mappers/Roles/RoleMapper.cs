using restapi.Contracts.Roles;
using restapi.Contracts.Users;
using restapi.Entities;
using restapi.Services.Roles.Commands.Create;
using restapi.Services.Roles.Commands.Delete;
using restapi.Services.Roles.Common;
using restapi.Services.Roles.Queries.GetRoleById;
using restapi.Services.Roles.Queries.GetRoles;

namespace restapi.Common.Services.Mappers.Roles;

public class RoleMapper : IRoleMapper
{
  public CreateRoleCommand MapCreateToCommand(CreateRoleRequest request, string userId)
  {
    return new CreateRoleCommand(request.Name, string.IsNullOrEmpty(userId) ? null : Guid.Parse(userId));
  }

  public List<RoleResult> MapDbListToResultList(List<Role> roles)
  {
    var resultList = new List<RoleResult>();

    foreach (var role in roles)
    {
      resultList.Add(new RoleResult(role));
    }

    return resultList;
  }

  public DeleteRoleCommand MapDeleteRole(Guid id)
  {
    return new DeleteRoleCommand(id);
  }

  public GetRoleByIdQuery MapGetByIdToCommand(Guid id)
  {
    return new GetRoleByIdQuery(id);
  }

  public GetRolesQuery MapGetRolesToCommand()
  {
    return new GetRolesQuery();
  }

  public List<RoleResponse> MapDbListToResponseList(List<Role> roles)
  {
    var resultList = MapDbListToResultList(roles);

    return MapResultListToResponseList(resultList);
  }

  public List<RoleResponse> MapResultListToResponseList(List<RoleResult> resultList)
  {
    var responseList = new List<RoleResponse>();

    foreach (RoleResult result in resultList)
    {
      responseList.Add(MapResultToResponse(result));
    }

    return responseList;
  }

  public RoleResponse MapResultToResponse(RoleResult result)
  {
    return new RoleResponse(
      result.Role.Id,
      result.Role.Name,
      result.Role.Created,
      result.Role.Updated,
      result.Role.Creator is not null ? new MinifiedUserResponse(
        result.Role.Creator.Id,
        result.Role.Creator.Email,
        result.Role.Creator.FirstName,
        result.Role.Creator.LastName,
        result.Role.Creator.DOB
      ) : null,
      result.Role.Editor is not null ? new MinifiedUserResponse(
        result.Role.Editor.Id,
        result.Role.Editor.Email,
        result.Role.Editor.FirstName,
        result.Role.Editor.LastName,
        result.Role.Editor.DOB
      ) : null
    );
  }
}
