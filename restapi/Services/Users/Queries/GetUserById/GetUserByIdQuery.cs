using ErrorOr;
using MediatR;
using restapi.Services.Users.Common;

namespace restapi.Services.Users.Queries.GetUserById;

public record GetUserByIdQuery(Guid Id) : IRequest<ErrorOr<UserResult>>;