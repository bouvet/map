using ErrorOr;
using MediatR;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Queries.GetLocations;

public record GetLocationsQuery(string Status) : IRequest<ErrorOr<List<LocationResult>>>;