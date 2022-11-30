using ErrorOr;
using MediatR;
using restapi.Services.Sessions.Common;

namespace restapi.Services.Sessions.Queries.GetAllSessions;

public record GetAllSessionsQuery(Guid? UserId) : IRequest<ErrorOr<List<SessionResult>>>;