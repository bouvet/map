using ErrorOr;
using MediatR;

namespace restapi.Services.Users.Commands.UpdatePassword;

public record UpdatePasswordCommand(
  string UserId,
  string Password,
  string ConfirmPassword
) : IRequest<ErrorOr<Updated>>;