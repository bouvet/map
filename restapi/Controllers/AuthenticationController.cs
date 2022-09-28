using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Contracts.Authentication;
using restapi.Services.Authentication.Commands.Register;
using restapi.Services.Authentication.Common;
using restapi.Services.Authentication.Queries.Login;

namespace restapi.Controllers;

[Route("api/auth")]
public class AuthenticationController : ApiController
{
  private readonly ISender mediator;
  private readonly IMapper mapper;

  public AuthenticationController(ISender mediator, IMapper mapper)
  {
    this.mediator = mediator;
    this.mapper = mapper;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register(RegisterRequest request)
  {
    var registerCommand = mapper.Map<RegisterCommand>(request);

    ErrorOr<AuthenticationResult> registerCommandResult = await mediator.Send(registerCommand);

    return registerCommandResult.Match(
      result => Ok(mapper.Map<AuthenticationResponse>(result)),
      errors => Problem(errors)
    );
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login(LoginRequest request)
  {
    var loginQuery = mapper.Map<LoginQuery>(request);

    ErrorOr<AuthenticationResult> loginQueryResult = await mediator.Send(loginQuery);

    return loginQueryResult.Match(
      result => Ok(mapper.Map<AuthenticationResponse>(result)),
      errors => Problem(errors)
    );
  }
}