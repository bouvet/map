using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Services.Sessions.Common;

namespace restapi.Services.Sessions.Queries.GetSessionById;

public class GetSessionQueryHandler : IRequestHandler<GetSessionByIdQuery, ErrorOr<SessionResult>>
{
    private readonly DataContext dataContext;

    public GetSessionQueryHandler(DataContext dataContext)
    {
        this.dataContext = dataContext;
    }

    public async Task<ErrorOr<SessionResult>> Handle(GetSessionByIdQuery request, CancellationToken cancellationToken)
    {
        var session = await dataContext
            .Sessions
            .Include(s => s.Registered)
            .Include(s => s.Location)
            .Include(s => s.User)
            .SingleOrDefaultAsync(s => s.Id == request.Id, cancellationToken: cancellationToken);

        if (session is null)
        {
            return Errors.Session.NotFound;
        }
        return new SessionResult(session);
    }
}