using ErrorOr;
using MediatR;

namespace restapi.Services.Authentication.Commands.AuthWithCode;

public record AuthWithCodeCommand(string Code) : IRequest<ErrorOr<AuthWithCodeResult>>;