using ErrorOr;
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

  public AuthenticationController(ISender mediator)
  {
    this.mediator = mediator;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register(RegisterRequest request)
  {
    var registerCommand = new RegisterCommand(
      request.Email,
      request.Password
    );

    ErrorOr<AuthenticationResult> registerCommandResult = await mediator.Send(registerCommand);

    return registerCommandResult.Match(
      result => Ok(MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login(LoginRequest request)
  {
    var loginQuery = new LoginQuery(
      request.Email,
      request.Password
    );

    ErrorOr<AuthenticationResult> loginQueryResult = await mediator.Send(loginQuery);

    return loginQueryResult.Match(
      result => Ok(MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  private static AuthenticationResponse MapResultToResponse(AuthenticationResult result)
  {
    return new AuthenticationResponse(
      result.User.Id,
      result.User.Email,
      result.User.FirstName,
      result.User.LastName,
      result.User.Address,
      result.User.PostalArea,
      result.User.PostalCode,
      result.User.PhoneNumber,
      result.User.DOB,
      result.User.Roles,
      result.Token
    );
  }
}