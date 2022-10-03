using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Services.Mappers.Users;
using restapi.Contracts.Users;
using restapi.Services.Users.Common;

namespace restapi.Controllers;

public class UsersController : ApiController
{
  private readonly ISender mediator;
  private readonly IUserMapper userMapper;

  public UsersController(ISender mediator, IUserMapper userMapper)
  {
    this.mediator = mediator;
    this.userMapper = userMapper;
  }

  [HttpGet]
  public async Task<IActionResult> GetUsers()
  {
    var getUsersQuery = userMapper.MapGetUsersToCommand();

    ErrorOr<List<UserResult>> getUsersQueryResult = await mediator.Send(getUsersQuery);

    return getUsersQueryResult.Match(
      result => Ok(userMapper.MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetUserById(Guid id)
  {
    var getUserByIdQuery = userMapper.MapGetByIdToCommand(id);

    ErrorOr<UserResult> getUserByIdQueryResult = await mediator.Send(getUserByIdQuery);

    return getUserByIdQueryResult.Match(
      result => Ok(userMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpPut("{id:guid}")]
  public async Task<IActionResult> UpdateUser(Guid id, UpdateUserRequest request)
  {
    var updateUserCommand = userMapper.MapUpdateToCommand(id, request);

    ErrorOr<Updated> updateUserCommandResult = await mediator.Send(updateUserCommand);

    return updateUserCommandResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [HttpPost("role")]
  public async Task<IActionResult> AddUserRole(AddUserRoleRequest request)
  {
    var addUserRoleCommand = userMapper.MapAddRoleToCommand(request);

    ErrorOr<UserResult> addUserRoleCommandResult = await mediator.Send(addUserRoleCommand);

    return addUserRoleCommandResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteUser(Guid id)
  {
    var deleteUserCommand = userMapper.MapDeleteToCommand(id);

    ErrorOr<Deleted> deleteUserResult = await mediator.Send(deleteUserCommand);

    return deleteUserResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }
}