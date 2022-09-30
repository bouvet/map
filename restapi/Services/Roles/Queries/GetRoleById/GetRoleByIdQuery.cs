using ErrorOr;
using MediatR;
using restapi.Services.Roles.Common;

namespace restapi.Services.Roles.Queries.GetRoleById;

public record GetRoleByIdQuery(Guid Id) : IRequest<ErrorOr<RoleResult>>;