using restapi.Contracts.Users;
using restapi.Entities;
using restapi.Services.Users.Commands.AddUserRole;
using restapi.Services.Users.Commands.Delete;
using restapi.Services.Users.Commands.Update;
using restapi.Services.Users.Common;
using restapi.Services.Users.Queries.GetUserById;
using restapi.Services.Users.Queries.GetUsers;

namespace restapi.Common.Services.Mappers.Users;

public interface IUserMapper
{
  GetUsersQuery MapGetUsersToCommand();
  GetUserByIdQuery MapGetByIdToCommand(Guid id, Guid? UserId);
  UpdateUserCommand MapUpdateToCommand(Guid id, UpdateUserRequest request);
  AddUserRoleCommand MapAddRoleToCommand(AddUserRoleRequest request);
  DeleteUserCommand MapDeleteToCommand(Guid id);
  UserResponse MapUserToUserResponse(User user);
  UserResponse MapResultToResponse(UserResult result);
  MinifiedUserResponse MapUserToMinifiedUserResponse(User user);
  List<UserResponse> MapResultListToResponseList(List<UserResult> resultList);
}