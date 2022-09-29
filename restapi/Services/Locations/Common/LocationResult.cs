using restapi.Models;

namespace restapi.Services.Locations.Common;

// public record LocationResult(
//   Location Location
// );
public record LocationResult(
  Guid Id,
  string Title,
  string Description,
  string Image,
  float Rating,
  double[] Coordinates,
  string Status,
  List<Category> Category,
  List<Review> Reviews
);