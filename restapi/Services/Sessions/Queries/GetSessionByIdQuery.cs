using ErrorOr;
using MediatR;
using restapi.Services.Sessions.Common;

namespace restapi.Services.Sessions.Queries.GetSessionById;

public record GetSessionByIdQuery(Guid Id) : IRequest<ErrorOr<SessionResult>>;