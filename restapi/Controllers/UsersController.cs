using System.Net;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Providers.Authorization;
using restapi.Common.Services.Mappers.Users;
using restapi.Contracts.Users;
using restapi.Services.Users.Commands.UpdatePassword;
using restapi.Services.Users.Common;

namespace restapi.Controllers;

[Authorize]
public class UsersController : ApiController
{
  private readonly ISender mediator;
  private readonly IUserMapper userMapper;
  private readonly IAuthorizationProvider authorizationProvider;

  public UsersController(ISender mediator, IUserMapper userMapper, IAuthorizationProvider authorizationProvider)
  {
    this.mediator = mediator;
    this.userMapper = userMapper;
    this.authorizationProvider = authorizationProvider;
  }

  [Authorize(Roles = "Administrator")]
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
    var authorizationResult = authorizationProvider.CheckAuthorization(HttpContext.User, id);

    if (!authorizationResult.IsAuthorized)
    {
      return Forbid();
    }

    var getUserByIdQuery = userMapper.MapGetByIdToCommand(id, authorizationResult.UserId);

    ErrorOr<UserResult> getUserByIdQueryResult = await mediator.Send(getUserByIdQuery);

    return getUserByIdQueryResult.Match(
      result => Ok(userMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpPut("{id:guid}")]
  public async Task<IActionResult> UpdateUser(Guid id, [FromForm] UpdateUserRequest request)
  {
    var tokenUserId = HttpContext.User.FindFirst("userId")?.Value;

    var isAdmin = HttpContext.User.IsInRole("Administrator");

    if (tokenUserId != id.ToString() && !isAdmin)
    {
      return Forbid();
    }

    var updateUserCommand = userMapper.MapUpdateToCommand(id, request);

    ErrorOr<Updated> updateUserCommandResult = await mediator.Send(updateUserCommand);

    return updateUserCommandResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "Administrator")]
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

  [Authorize(Roles = "Administrator")]
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

  [Authorize(Roles = "ResettingPassword")]
  [HttpPut("password")]
  public async Task<IActionResult> UpdatePassword(UpdatePasswordRequest request)
  {
    var userId = HttpContext.User.FindFirst("userId")?.Value;

    var updatePasswordCommand = new UpdatePasswordCommand(
      userId ?? "",
      request.Password,
      request.ConfirmPassword
    );

    ErrorOr<Updated> updatePasswordResult = await mediator.Send(updatePasswordCommand);

    return updatePasswordResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }
}