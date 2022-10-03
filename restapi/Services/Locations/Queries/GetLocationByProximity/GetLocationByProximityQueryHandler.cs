using ErrorOr;
using GeoCoordinatePortable;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Queries.GetLocationByProximity;

public class GetLocationByProximityQueryHandler : IRequestHandler<GetLocationByProximityQuery, ErrorOr<LocationResult>>
{
  private readonly DataContext dataContext;

  public GetLocationByProximityQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<LocationResult>> Handle(GetLocationByProximityQuery request, CancellationToken cancellationToken)
  {
    var locations = await dataContext.Locations.ToListAsync(cancellationToken: cancellationToken);
    var _category = await dataContext.Categories.FindAsync(new object?[] { request.CategoryId }, cancellationToken: cancellationToken);

    var coord = new GeoCoordinate(request.Latitude, request.Longitude);

    var locationsWithCategory = locations.Where(x => x.Categories.Exists(x => x.Id == request.CategoryId) || Guid.Empty == request.CategoryId);

    if (!locationsWithCategory.Any())
    {
      return Errors.Location.NotFound;
    }

    var nearest = locationsWithCategory.Select(x => new GeoCoordinate(x.Latitude, x.Longitude))
                    .OrderBy(x => x.GetDistanceTo(coord))
                    .First();

    var nearestLocationList = locations.Where(l => l.Latitude == nearest.Latitude && l.Longitude == nearest.Longitude);

    var location = nearestLocationList.First();

    return new LocationResult(location);
  }
}
