using restapi.Contracts.Sessions;
using restapi.Services.Sessions.Commands.Create;
using restapi.Services.Sessions.Common;
using restapi.Services.Sessions.Queries.GetSessionById;

namespace restapi.Common.Services.Mappers.Sessions;

public class SessionMapper : ISessionMapper
{
    public CreateSessionCommand MapCreateRequestToCommand(CreateSessionRequest request)
    {
        return new CreateSessionCommand(
            request.LocationID,
            request.Registered,
            request.UserId
        );
    }

    public SessionResponse MapResultToResponse(SessionResult result)
    {
        return new SessionResponse(
            result.Session.Id,
            result.Session.Registered,
            result.Session.Location.Title,
            result.Session.User.Id
        );
    }

    public GetSessionByIdQuery MapGetByIdQueryToCommand(Guid id)
    {
        return new GetSessionByIdQuery(id);
    }
}