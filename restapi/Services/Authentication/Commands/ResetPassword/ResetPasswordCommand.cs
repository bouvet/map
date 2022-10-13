using ErrorOr;
using MediatR;

namespace restapi.Services.Authentication.Commands.ResetPassword;

public record ResetPasswordCommand(
  string Email
) : IRequest<ErrorOr<Success>>;