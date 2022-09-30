using ErrorOr;
using MediatR;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Query.GetLocationById;

public record GetLocationByIdQuery(Guid Id) : IRequest<ErrorOr<LocationResult>>;