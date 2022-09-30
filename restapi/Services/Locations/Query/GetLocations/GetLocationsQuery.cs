using ErrorOr;
using MediatR;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Query.GetLocations;

public record GetLocationsQuery() : IRequest<ErrorOr<List<LocationResult>>>;