using ErrorOr;
using MediatR;

namespace restapi.Services.Users.Commands.UpdatePassword;

public record UpdatePasswordCommand(
  Guid? UserId,
  string? CurrentPassword,
  string Password,
  string ConfirmPassword
) : IRequest<ErrorOr<Updated>>;