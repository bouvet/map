using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Contracts.Users;
using restapi.Services.Users.Commands.AddUserRole;
using restapi.Services.Users.Commands.Delete;
using restapi.Services.Users.Commands.Update;
using restapi.Services.Users.Common;
using restapi.Services.Users.Queries.GetUserById;
using restapi.Services.Users.Queries.GetUsers;

namespace restapi.Controllers;

public class UsersController : ApiController
{
  private readonly ISender mediator;

  public UsersController(ISender mediator)
  {
    this.mediator = mediator;
  }

  [HttpGet]
  public async Task<IActionResult> GetUsers()
  {
    var getUsersQuery = new GetUsersQuery();

    ErrorOr<List<UserResult>> getUsersQueryResult = await mediator.Send(getUsersQuery);

    return getUsersQueryResult.Match(
      result => Ok(MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetUserById(Guid id)
  {
    var getUserByIdQuery = new GetUserByIdQuery(id);

    ErrorOr<UserResult> getUserByIdQueryResult = await mediator.Send(getUserByIdQuery);

    return getUserByIdQueryResult.Match(
      result => Ok(MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpPut("{id:guid}")]
  public async Task<IActionResult> UpdateUser(Guid id, UpdateUserRequest request)
  {
    var updateUserCommand = new UpdateUserCommand(
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

    ErrorOr<Updated> updateUserCommandResult = await mediator.Send(updateUserCommand);

    return updateUserCommandResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [HttpPost("role")]
  public async Task<IActionResult> AddUserRole(AddUserRoleRequest request)
  {
    var addUserRoleCommand = new AddUserRoleCommand(
      request.UserId,
      request.RoleId
    );

    ErrorOr<UserResult> addUserRoleCommandResult = await mediator.Send(addUserRoleCommand);

    return addUserRoleCommandResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteUser(Guid id)
  {
    var deleteUserCommand = new DeleteUserCommand(id);

    ErrorOr<Deleted> deleteUserResult = await mediator.Send(deleteUserCommand);

    return deleteUserResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private static UserResponse MapResultToResponse(UserResult result)
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
      result.User.Roles
    );
  }

  private static List<UserResponse> MapResultListToResponseList(List<UserResult> resultList)
  {
    var mappedResponseList = new List<UserResponse>();

    foreach (var result in resultList)
    {
      mappedResponseList.Add(MapResultToResponse(result));
    }

    return mappedResponseList;
  }
}