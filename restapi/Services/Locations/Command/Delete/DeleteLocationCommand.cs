using ErrorOr;
using MediatR;

namespace restapi.Services.Locations.Command.Delete;

public record DeleteLocationCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;