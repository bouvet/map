using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Entities;
using restapi.Services.Sessions.Common;

namespace restapi.Services.Sessions.Queries.GetSessions;

public class GetSessionsQueryHandler : IRequestHandler<GetSessionsQuery, ErrorOr<List<SessionResult>>>
{
    private readonly DataContext dataContext;

    public GetSessionsQueryHandler(DataContext dataContext)
    {
        this.dataContext = dataContext;
    }

    public async Task<ErrorOr<List<SessionResult>>> Handle(GetSessionsQuery request, CancellationToken cancellationToken)
    {
        if (request.UserId == Guid.Empty)
        {
            return Errors.User.NotFound;
        }
        List<Session> sessions;

        if (request.LocationId == Guid.Empty)
        {
            sessions = await dataContext.Sessions.ToListAsync(cancellationToken: cancellationToken);
        }
        else
        {
            sessions = await dataContext.Sessions.Where(session => request.LocationId == session.Location.Id)
            .Include(session => session.User).Where(session => session.User.Id == request.UserId).ToListAsync(cancellationToken: cancellationToken);
        }

        var sessionResultList = new List<SessionResult>();

        foreach (Session session in sessions)
        {
            sessionResultList.Add(new SessionResult(session));
        }

        return sessionResultList;
    }
}