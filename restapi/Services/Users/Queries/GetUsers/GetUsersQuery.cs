using ErrorOr;
using MediatR;
using restapi.Services.Users.Common;

namespace restapi.Services.Users.Queries.GetUsers;

public record GetUsersQuery() : IRequest<ErrorOr<List<UserResult>>>;