using ErrorOr;
using MediatR;
using restapi.Services.Sessions.Common;

namespace restapi.Services.Sessions.Commands.Create;

public record CreateSessionCommand(
    Guid LocationId,
    DateTime Registered,
    Guid UserId
) : IRequest<ErrorOr<SessionResult>>;