using ErrorOr;
using MediatR;
using restapi.Common.Providers;
using restapi.Data;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Command.UpdateImage;

public class UpdateImageCommandHandler : IRequestHandler<UpdateImageCommand, ErrorOr<LocationResult>>
{
  private readonly DataContext dataContext;

  public UpdateImageCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<LocationResult>> Handle(UpdateImageCommand request, CancellationToken cancellationToken)
  {
    var location = await dataContext.Locations.FindAsync(new object?[] { request.LocationId }, cancellationToken: cancellationToken);

    if (location is null)
    {
      return Errors.Location.NotFound;
    }

    location.Image = request.ImageURI.Replace(AzureProvider.AzureBlobStorageServer, AzureProvider.AzureCDNserver);

    await dataContext.SaveChangesAsync(cancellationToken);

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