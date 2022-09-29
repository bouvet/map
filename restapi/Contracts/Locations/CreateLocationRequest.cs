namespace restapi.Contracts.Locations;

public record CreateLocationRequest(
  string Title,
  string Description,
  IFormFile? Image,
  double Longitude,
  double Latitude,
  List<Guid>? Category
);