using ErrorOr;
using MediatR;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Queries.GetLocations;

public record GetLocationsQuery() : IRequest<ErrorOr<List<LocationResult>>>;