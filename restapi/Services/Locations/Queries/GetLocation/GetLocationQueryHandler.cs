using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Queries.GetLocation;

public class GetLocationQueryHandler : IRequestHandler<GetLocationQuery, ErrorOr<LocationResult>>
{
  private readonly DataContext dataContext;

  public GetLocationQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<LocationResult>> Handle(GetLocationQuery request, CancellationToken cancellationToken)
  {
    var location = await dataContext.Locations.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (location is null)
    {
      return Errors.Location.NotFound;
    }

    return new LocationResult(
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
  }
}