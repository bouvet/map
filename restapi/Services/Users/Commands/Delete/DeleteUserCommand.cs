using ErrorOr;
using MediatR;

namespace restapi.Services.Users.Commands.Delete;

public record DeleteUserCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;