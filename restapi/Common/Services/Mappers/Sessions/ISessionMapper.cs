using restapi.Contracts.Sessions;
using restapi.Services.Sessions.Commands.Create;
using restapi.Services.Sessions.Common;
using restapi.Services.Sessions.Queries.GetSessionById;

namespace restapi.Common.Services.Mappers.Sessions;

public interface ISessionMapper
{
    CreateSessionCommand MapCreateRequestToCommand(CreateSessionRequest request);
    SessionResponse MapResultToResponse(SessionResult result);

    GetSessionByIdQuery MapGetByIdQueryToCommand(Guid id);
}