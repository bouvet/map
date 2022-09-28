using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Services.Roles.Commands.Create;
using restapi.Services.Roles.Common;

namespace restapi.Controllers;

[Authorize(Roles = "Administrator")]
public class RolesController : ApiController
{
  private readonly IMapper mapper;
  private readonly ISender mediator;

  public RolesController(IMapper mapper, ISender mediator)
  {
    this.mapper = mapper;
    this.mediator = mediator;
  }

  [HttpPost]
  public async Task<IActionResult> CreateRole(CreateRoleCommand request)
  {
    var createRoleCommand = mapper.Map<CreateRoleCommand>(request);

    ErrorOr<RoleResult> createRoleCommandResult = await mediator.Send(createRoleCommand);

    return createRoleCommandResult.Match(
      result => Ok(mapper.Map<RoleResponse>(result)),
      errors => Problem(errors)
    );
  }

  // private CreatedAtActionResult CreatedAtGetReview(ReviewResponseDto review)
  // {
  //   return CreatedAtAction(
  //       actionName: nameof(GetReview),
  //       routeValues: new { id = review.Id },
  //       value: review
  //     );
  // }
}