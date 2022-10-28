using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Services.Mappers.Roles;
using restapi.Contracts.Roles;
using restapi.Services.Roles.Common;

namespace restapi.Controllers;

// [Authorize(Roles = "Administrator")]
public class RolesController : ApiController
{
  private readonly ISender mediator;
  private readonly IRoleMapper roleMapper;

  public RolesController(ISender mediator, IRoleMapper roleMapper)
  {
    this.mediator = mediator;
    this.roleMapper = roleMapper;
  }

  [HttpPost]
  public async Task<IActionResult> CreateRole(CreateRoleRequest request)
  {
    var userId = HttpContext.User.FindFirst("userId")?.Value;

    var createRoleCommand = roleMapper.MapCreateToCommand(request, userId ?? "");

    ErrorOr<RoleResult> createRoleCommandResult = await mediator.Send(createRoleCommand);

    return createRoleCommandResult.Match(
      result => CreatedAtGetRole(result),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetRoleById(Guid id)
  {
    var getRoleByIdQuery = roleMapper.MapGetByIdToCommand(id);

    ErrorOr<RoleResult> getRoleByIdQueryResult = await mediator.Send(getRoleByIdQuery);

    return getRoleByIdQueryResult.Match(
      result => Ok(roleMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet]
  public async Task<IActionResult> GetRoles()
  {
    var getRolesQuery = roleMapper.MapGetRolesToCommand();

    ErrorOr<List<RoleResult>> getRolesQueryResult = await mediator.Send(getRolesQuery);

    return getRolesQueryResult.Match(
      result => Ok(roleMapper.MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteRole(Guid id)
  {
    var deleteRoleCommand = roleMapper.MapDeleteRole(id);

    ErrorOr<Deleted> deleteRoleCommandResult = await mediator.Send(deleteRoleCommand);

    return deleteRoleCommandResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private CreatedAtActionResult CreatedAtGetRole(RoleResult result)
  {
    return CreatedAtAction(
        actionName: nameof(GetRoleById),
        routeValues: new { id = result.Role.Id },
        value: roleMapper.MapResultToResponse(result)
      );
  }
}