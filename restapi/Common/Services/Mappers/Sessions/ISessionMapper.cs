using restapi.Contracts.Sessions;
using restapi.Entities;
using restapi.Services.Sessions.Commands.Create;
using restapi.Services.Sessions.Commands.Delete;
using restapi.Services.Sessions.Common;
using restapi.Services.Sessions.Queries.GetSessionById;
using restapi.Services.Sessions.Queries.GetSessions;

namespace restapi.Common.Services.Mappers.Sessions;

public interface ISessionMapper
{
    CreateSessionCommand MapCreateRequestToCommand(CreateSessionRequest request, Guid? UserId);
    SessionResponse MapResultToResponse(SessionResult result);
    GetSessionByIdQuery MapGetByIdQueryToCommand(Guid id);
    GetSessionsQuery MapGetSessionsToCommand(Guid locationId);
    DeleteSessionCommand MapDeleteToCommand(Session session);
    List<SessionResponse> MapResultListToResponseList(List<SessionResult> resultList);
}