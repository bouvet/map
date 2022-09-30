using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Contracts.Roles;
using restapi.Services.Roles.Commands.Create;
using restapi.Services.Roles.Common;
using restapi.Services.Roles.Queries.GetRoleById;
using restapi.Services.Roles.Queries.GetRoles;

namespace restapi.Controllers;

[Authorize(Roles = "Administrator")]
public class RolesController : ApiController
{
  private readonly ISender mediator;

  public RolesController(ISender mediator)
  {
    this.mediator = mediator;
  }

  [HttpPost]
  public async Task<IActionResult> CreateRole(CreateRoleCommand request)
  {
    var createRoleCommand = new CreateRoleCommand(request.Name);

    ErrorOr<RoleResult> createRoleCommandResult = await mediator.Send(createRoleCommand);

    return createRoleCommandResult.Match(
      result => CreatedAtGetRole(result),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetRoleById(Guid id)
  {
    var getRoleByIdQuery = new GetRoleByIdQuery(id);

    ErrorOr<RoleResult> getRoleByIdQueryResult = await mediator.Send(getRoleByIdQuery);

    return getRoleByIdQueryResult.Match(
      result => Ok(MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet]
  public async Task<IActionResult> GetRoles()
  {
    var getRolesQuery = new GetRolesQuery();

    ErrorOr<List<RoleResult>> getRolesQueryResult = await mediator.Send(getRolesQuery);

    return getRolesQueryResult.Match(
      result => Ok(MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  private static RoleResponse MapResultToResponse(RoleResult result)
  {
    return new RoleResponse(
      result.Role.Id,
      result.Role.Name,
      result.Role.Created,
      result.Role.Updated,
      result.Role.Users
    );
  }

  // TODO: Make this global as it's being used by all controllers.
  private static List<RoleResponse> MapResultListToResponseList(List<RoleResult> resultList)
  {
    var mappedList = new List<RoleResponse>();

    foreach (RoleResult result in resultList)
    {
      mappedList.Add(MapResultToResponse(result));
    }

    return mappedList;
  }

  private CreatedAtActionResult CreatedAtGetRole(RoleResult result)
  {
    return CreatedAtAction(
        actionName: nameof(GetRoleById),
        routeValues: new { id = result.Role.Id },
        value: MapResultToResponse(result)
      );
  }
}