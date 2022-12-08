using ErrorOr;
using MediatR;

namespace restapi.Services.Users.Commands.ChangeEmail;

public record ChangeEmailCommand(string Email, Guid? UserId) : IRequest<ErrorOr<Updated>>;