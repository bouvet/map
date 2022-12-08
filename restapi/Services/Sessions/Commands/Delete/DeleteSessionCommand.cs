using ErrorOr;
using MediatR;
using restapi.Entities;

namespace restapi.Services.Sessions.Commands.Delete;

public record DeleteSessionCommand(
    Session Session
) : IRequest<ErrorOr<Deleted>>;