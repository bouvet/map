using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Services.Mappers.Authentication;
using restapi.Contracts.Authentication;
using restapi.Services.Authentication.Commands.ResetPassword;
using restapi.Services.Authentication.Common;

namespace restapi.Controllers;

[Route("api/auth")]
public class AuthenticationController : ApiController
{
  private readonly ISender mediator;
  private readonly IAuthenticationMapper authenticationMapper;

  public AuthenticationController(ISender mediator, IAuthenticationMapper authenticationMapper)
  {
    this.mediator = mediator;
    this.authenticationMapper = authenticationMapper;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register(RegisterRequest request)
  {
    var registerCommand = authenticationMapper.MapRegisterRequestToCommand(request);

    ErrorOr<AuthenticationResult> registerCommandResult = await mediator.Send(registerCommand);

    return registerCommandResult.Match(
      result => Ok(authenticationMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login(LoginRequest request)
  {
    var loginQuery = authenticationMapper.MapLoginQueryToCommand(request);

    ErrorOr<AuthenticationResult> loginQueryResult = await mediator.Send(loginQuery);

    return loginQueryResult.Match(
      result => Ok(authenticationMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpPost("reset-password")]
  public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
  {
    var resetPasswordCommand = new ResetPasswordCommand(request.Email);

    ErrorOr<Success> resetPasswordResult = await mediator.Send(resetPasswordCommand);

    return resetPasswordResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }
}