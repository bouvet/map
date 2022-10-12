using restapi.Common.Services.Mappers.Roles;
using restapi.Contracts.Users;
using restapi.Entities;
using restapi.Services.Users.Commands.AddUserRole;
using restapi.Services.Users.Commands.Delete;
using restapi.Services.Users.Commands.Update;
using restapi.Services.Users.Common;
using restapi.Services.Users.Queries.GetUserById;
using restapi.Services.Users.Queries.GetUsers;

namespace restapi.Common.Services.Mappers.Users;

public class UserMapper : IUserMapper
{
  private readonly IRoleMapper roleMapper;

  public UserMapper(IRoleMapper roleMapper)
  {
    this.roleMapper = roleMapper;
  }

  public UserResponse MapUserToUserResponse(User user)
  {
    return new UserResponse(
       user.Id,
       user.Email,
       user.FirstName,
       user.LastName,
       user.Address,
       user.PostalArea,
       user.PostalCode,
       user.PhoneNumber,
       user.DOB,
       roleMapper.MapDbListToResponseList(user.Roles)
      );
  }

  public UserResponse MapResultToResponse(UserResult result)
  {
    return new UserResponse(
      result.User.Id,
      result.User.Email,
      result.User.FirstName,
      result.User.LastName,
      result.User.Address,
      result.User.PostalArea,
      result.User.PostalCode,
      result.User.PhoneNumber,
      result.User.DOB,
      roleMapper.MapDbListToResponseList(result.User.Roles)
    );
  }

  public List<UserResponse> MapResultListToResponseList(List<UserResult> resultList)
  {
    var responseList = new List<UserResponse>();

    foreach (var result in resultList)
    {
      responseList.Add(MapResultToResponse(result));
    }

    return responseList;
  }

  public GetUsersQuery MapGetUsersToCommand()
  {
    return new GetUsersQuery();
  }

  public GetUserByIdQuery MapGetByIdToCommand(Guid id)
  {
    return new GetUserByIdQuery(id);
  }

  public UpdateUserCommand MapUpdateToCommand(Guid id, UpdateUserRequest request)
  {
    return new UpdateUserCommand(
      id,
      request.Email,
      request.FirstName,
      request.LastName,
      request.Address,
      request.PostalArea,
      request.PostalCode,
      request.PhoneNumber,
      request.DOB
    );
  }

  public AddUserRoleCommand MapAddRoleToCommand(AddUserRoleRequest request)
  {
    return new AddUserRoleCommand(
      request.UserId,
      request.RoleId
    );
  }

  public DeleteUserCommand MapDeleteToCommand(Guid id)
  {
    return new DeleteUserCommand(id);
  }

  public MinifiedUserResponse MapUserToMinifiedUserResponse(User user)
  {
    return new MinifiedUserResponse(
      user.Id,
      user.Email,
      user.FirstName,
      user.LastName
    );
  }
}
