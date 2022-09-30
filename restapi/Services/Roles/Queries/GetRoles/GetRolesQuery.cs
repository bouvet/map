using ErrorOr;
using MediatR;
using restapi.Services.Roles.Common;

namespace restapi.Services.Roles.Queries.GetRoles;

public record GetRolesQuery() : IRequest<ErrorOr<List<RoleResult>>>;