using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Models;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Queries.GetLocations;

public class GetLocationsQueryHandler : IRequestHandler<GetLocationsQuery, ErrorOr<List<LocationResult>>>
{
  private readonly DataContext dataContext;

  public GetLocationsQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<List<LocationResult>>> Handle(GetLocationsQuery request, CancellationToken cancellationToken)
  {
    var locations = await dataContext.Locations.Include("Reviews").ToListAsync(cancellationToken: cancellationToken);

    var locationResultList = new List<LocationResult>();

    foreach (Location location in locations)
    {
      var locationResult = new LocationResult(
        location.Id,
        location.Title,
        location.Description,
        location.Image,
        location.Rating,
        new[] { location.Longitude, location.Latitude },
        location.Status,
        location.Categories,
        location.Reviews
      );

      locationResultList.Add(locationResult);
    }

    return locationResultList;
  }
}
