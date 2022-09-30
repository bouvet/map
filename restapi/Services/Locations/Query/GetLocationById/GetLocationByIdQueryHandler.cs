using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Query.GetLocationById;

public class GetLocationByIdQueryHandler : IRequestHandler<GetLocationByIdQuery, ErrorOr<LocationResult>>
{
  private readonly DataContext dataContext;

  public GetLocationByIdQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<LocationResult>> Handle(GetLocationByIdQuery request, CancellationToken cancellationToken)
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
