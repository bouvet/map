using ErrorOr;
using MediatR;
using restapi.Entities;
using restapi.Services.Sessions.Common;

namespace restapi.Services.Sessions.Queries.GetSessions;

public record GetSessionsQuery(Guid LocationId) : IRequest<ErrorOr<List<SessionResult>>>;