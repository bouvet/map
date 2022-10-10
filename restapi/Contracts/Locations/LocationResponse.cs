using restapi.Contracts.Categories;
using restapi.Contracts.ImageStorage;
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
  ImageStorageResponse? OriginalImage,
  ImageStorageResponse? WebpImage,
  string Status,
  float Rating,
  List<CategoryResponse> Category
);

public record LocationGeometry(
  // Longitude, Latitude
  double[] Coordinates
);