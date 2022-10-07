using restapi.Contracts.Categories;
using restapi.Contracts.Users;

namespace restapi.Contracts.Locations;

public record LocationResponse(
  Guid Id,
  string Type,
  MinifiedUserResponse? Creator,
  MinifiedUserResponse? Editor,
  LocationProperties Properties,
  LocationGeometry Geometry
);

public record LocationProperties(
  string Title,
  string Description,
  string Image,
  string Status,
  float Rating,
  List<CategoryResponse> Category
);

public record LocationGeometry(
  // Longitude, Latitude
  double[] Coordinates
);