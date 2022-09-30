using ErrorOr;
using MediatR;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Query.GetLocationByProximity;

public record GetLocationByProximityQuery(
  double Latitude,
  double Longitude,
  Guid CategoryId
) : IRequest<ErrorOr<LocationResult>>;