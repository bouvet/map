using ErrorOr;
using MediatR;

namespace restapi.Services.Roles.Commands.Delete;

public record DeleteRoleCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;