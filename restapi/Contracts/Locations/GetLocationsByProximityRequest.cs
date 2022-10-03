namespace restapi.Contracts.Locations;

public record GetLocationByProximityRequest(
  double Latitude,
  double Longitude,
  Guid CategoryId
);