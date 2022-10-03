using ErrorOr;
using MediatR;

namespace restapi.Services.Locations.Commands.Delete;

public record DeleteLocationCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;