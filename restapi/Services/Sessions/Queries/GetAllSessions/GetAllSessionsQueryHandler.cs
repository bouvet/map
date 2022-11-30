using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Entities;
using restapi.Services.Sessions.Common;

namespace restapi.Services.Sessions.Queries.GetAllSessions;

public class GetAllSessionsQueryHandler : IRequestHandler<GetAllSessionsQuery, ErrorOr<List<SessionResult>>>
{
    private readonly DataContext dataContext;

    public GetAllSessionsQueryHandler(DataContext dataContext)
    {
        this.dataContext = dataContext;
    }

    public async Task<ErrorOr<List<SessionResult>>> Handle(GetAllSessionsQuery request, CancellationToken cancellationToken)
    {
        if (request.UserId == Guid.Empty)
        {
            return Errors.User.NotFound;
        }
        List<Session> sessions = await dataContext.Sessions.Where(session => session.User.Id == request.UserId)
        .Include(session => session.User).Where(session => session.User.Id == request.UserId).ToListAsync(cancellationToken: cancellationToken);

        var sessionResultList = new List<SessionResult>();

        foreach (Session session in sessions)
        {
            sessionResultList.Add(new SessionResult(session));
        }

        return sessionResultList;
    }
}