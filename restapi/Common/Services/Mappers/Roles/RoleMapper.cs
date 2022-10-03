using restapi.Common.Services.Mappers.Users;
using restapi.Contracts.Roles;
using restapi.Services.Roles.Commands.Create;
using restapi.Services.Roles.Common;
using restapi.Services.Roles.Queries.GetRoleById;
using restapi.Services.Roles.Queries.GetRoles;

namespace restapi.Common.Services.Mappers.Roles;

public class RoleMapper : IRoleMapper
{
  private readonly IUserMapper userMapper;

  public RoleMapper(IUserMapper userMapper)
  {
    this.userMapper = userMapper;
  }

  public CreateRoleCommand MapCreateToCommand(CreateRoleRequest request)
  {
    return new CreateRoleCommand(request.Name);
  }

  public GetRoleByIdQuery MapGetByIdToCommand(Guid id)
  {
    return new GetRoleByIdQuery(id);
  }

  public GetRolesQuery MapGetRolesToCommand()
  {
    return new GetRolesQuery();
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
      result.Role.Creator is not null ? userMapper.MapUserToUserResponse(result.Role.Creator) : null,
      result.Role.Editor is not null ? userMapper.MapUserToUserResponse(result.Role.Editor) : null,
      result.Role.Users
    );
  }
}
