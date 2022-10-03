namespace restapi.Contracts.Locations;

public record UpdateLocationRequest(
  Guid Id,
  string Title,
  string Description,
  IFormFile? Image,
  string Status,
  double Longitude,
  double Latitude,
  List<Guid>? Category
);