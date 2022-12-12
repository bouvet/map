using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Providers.Authorization;
using restapi.Common.Services.Mappers.Users;
using restapi.Contracts.Users;
using restapi.Services.Users.Commands.ChangeEmail;
using restapi.Services.Users.Commands.ConfirmEmail;
using restapi.Services.Users.Commands.Delete;
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

  [Authorize(Roles = "User, Administrator")]
  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteUser(Guid id)
  {
    var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, id);

    if (!authResult.IsAuthorized)
    {
      return Forbid();
    }

    var deleteUserCommand = new DeleteUserCommand(id);

    ErrorOr<Deleted> deleteUserResult = await mediator.Send(deleteUserCommand);

    return deleteUserResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "User, ResettingPassword")]
  [HttpPut("password")]
  public async Task<IActionResult> UpdatePassword(UpdatePasswordRequest request)
  {
    var authorizationResult = authorizationProvider.CheckAuthorization(HttpContext.User, null);

    var updatePasswordCommand = new UpdatePasswordCommand(
      authorizationResult.UserId,
      request.CurrentPassword,
      request.Password,
      request.ConfirmPassword
    );

    ErrorOr<Updated> updatePasswordResult = await mediator.Send(updatePasswordCommand);

    return updatePasswordResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [HttpPut("change-email")]
  public async Task<IActionResult> ChangeEmail(ChangeEmailRequest request)
  {
    var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, null);

    var updateEmailCommand = new ChangeEmailCommand(request.Email, authResult.UserId);

    ErrorOr<Updated> updateEmailResult = await mediator.Send(updateEmailCommand);

    return updateEmailResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "ChangingEmail")]
  [HttpPut("confirm-email")]
  public async Task<IActionResult> ConfirmEmail()
  {
    var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, null);

    var confirmEmailCommand = new ConfirmEmailCommand(authResult.UserId);

    ErrorOr<string> confirmEmailResult = await mediator.Send(confirmEmailCommand);

    return confirmEmailResult.Match(
      result => Ok(result),
      errors => Problem(errors)
    );
  }
}