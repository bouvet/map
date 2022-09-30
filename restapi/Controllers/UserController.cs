using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Services.Users;
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
      result => Ok(result),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetUserById(Guid id)
  {
    var getUserByIdQuery = new GetUserByIdQuery(id);

    ErrorOr<UserResult> getUserByIdQueryResult = await mediator.Send(getUserByIdQuery);

    return getUserByIdQueryResult.Match(
      result => Ok(result),
      errors => Problem(errors)
    );
  }

  [HttpPut("{id:guid}")]
  public async Task<IActionResult> UpdateUser(Guid id, UpdateUserCommand request)
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
      request.DOB,
      request.RoleIds
    );

    ErrorOr<Updated> updateUserCommandResult = await mediator.Send(updateUserCommand);

    return updateUserCommandResult.Match(
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

  // private CreatedAtActionResult CreatedAtGetUser(UserResponseDto user)
  // {
  //   return CreatedAtAction(
  //       actionName: nameof(GetUser),
  //       routeValues: new { id = user.Id },
  //       value: user
  //     );
  // }
}