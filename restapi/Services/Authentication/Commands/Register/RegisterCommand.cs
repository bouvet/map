using ErrorOr;
using MediatR;
using restapi.Services.Authentication.Common;

namespace restapi.Services.Authentication.Commands.Register;

public record RegisterCommand(
  string Email,
  string Password
) : IRequest<ErrorOr<AuthenticationResult>>;