using ErrorOr;
using MediatR;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Queries.GetLocationById;

public record GetLocationByIdQuery(Guid Id) : IRequest<ErrorOr<LocationResult>>;