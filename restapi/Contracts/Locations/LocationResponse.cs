using restapi.Models;

namespace restapi.Contracts.Locations;

public record LocationResponse(
  Guid Id,
  string Type,
  LocationProperties Properties,
  LocationGeometry Geometry
);

public record LocationProperties(
  string Title,
  string Description,
  string Image,
  string Status,
  float Rating,
  List<Category> Category
);

public record LocationGeometry(
  // Longitude, Latitude
  double[] Coordinates
);