using ErrorOr;
using MediatR;
using restapi.Entities;

namespace restapi.Services.Locations.Commands.Delete;

public record DeleteLocationCommand(Location? Location) : IRequest<ErrorOr<Deleted>>;