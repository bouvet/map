using restapi.Contracts.Sessions;
using restapi.Entities;
using restapi.Services.Sessions.Commands.Create;
using restapi.Services.Sessions.Commands.Delete;
using restapi.Services.Sessions.Common;
using restapi.Services.Sessions.Queries.GetAllSessions;
using restapi.Services.Sessions.Queries.GetSessionById;
using restapi.Services.Sessions.Queries.GetSessions;

namespace restapi.Common.Services.Mappers.Sessions;

public class SessionMapper : ISessionMapper
{
    public CreateSessionCommand MapCreateRequestToCommand(CreateSessionRequest request, Guid? UserId)
    {
        return new CreateSessionCommand(
            request.LocationId,
            request.Registered,
            UserId
        );
    }

    public SessionResponse MapResultToResponse(SessionResult result)
    {
        return new SessionResponse(
            result.Session.Id,
            result.Session.Registered,
            result.Session.Location.Title,
            result.Session.Location.Id,
            result.Session.User.Id
        );
    }

    public List<SessionResponse> MapResultListToResponseList(List<SessionResult> resultList)
    {
        var mappedList = new List<SessionResponse>();

        foreach (SessionResult result in resultList)
        {
            mappedList.Add(MapResultToResponse(result));
        }

        return mappedList;
    }

    public GetSessionsQuery MapGetSessionsToCommand(Guid locationId, Guid? UserId)
    {
        return new GetSessionsQuery(locationId, UserId);
    }

    public GetAllSessionsQuery MapGetAllSessionsToCommand(Guid? UserId)
    {
        return new GetAllSessionsQuery(UserId);
    }

    public GetSessionByIdQuery MapGetByIdQueryToCommand(Guid id)
    {
        return new GetSessionByIdQuery(id);
    }

    public DeleteSessionCommand MapDeleteToCommand(Session session)
    {
        return new DeleteSessionCommand(session);
    }
}