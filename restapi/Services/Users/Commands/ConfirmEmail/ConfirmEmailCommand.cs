using ErrorOr;
using MediatR;

namespace restapi.Services.Users.Commands.ConfirmEmail;

public record ConfirmEmailCommand(Guid? UserId) : IRequest<ErrorOr<string>>;