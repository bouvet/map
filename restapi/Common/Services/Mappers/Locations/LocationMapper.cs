using restapi.Common.Providers;
using restapi.Contracts.Locations;
using restapi.Services.Locations.Commands.Create;
using restapi.Services.Locations.Commands.Delete;
using restapi.Services.Locations.Commands.Update;
using restapi.Services.Locations.Common;
using restapi.Services.Locations.Queries.GetLocationById;
using restapi.Services.Locations.Queries.GetLocationByProximity;
using restapi.Services.Locations.Queries.GetLocations;

namespace restapi.Common.Services.Mappers.Locations;

public class LocationMapper : ILocationMapper
{
  public CreateLocationCommand MapCreateRequestToCommand(CreateLocationRequest request)
  {
    return new CreateLocationCommand(
      request.Title,
      request.Description,
      request.Image,
      request.Longitude,
      request.Latitude,
      request.Category
    );
  }

  public DeleteLocationCommand MapDeleteToCommand(Guid id)
  {
    return new DeleteLocationCommand(id);
  }

  public GetLocationByIdQuery MapGetByIdToCommand(Guid id)
  {
    return new GetLocationByIdQuery(id);
  }

  public GetLocationByProximityQuery MapGetByProximityToCommand(GetLocationByProximityRequest request)
  {
    return new GetLocationByProximityQuery(request.Latitude, request.Longitude, request.CategoryId);
  }

  public GetLocationsQuery MapGetLocationsQueryToCommand()
  {
    return new GetLocationsQuery();
  }

  public List<LocationResponse> MapResultListToResponseList(List<LocationResult> resultList)
  {
    var responseList = new List<LocationResponse>();

    foreach (LocationResult result in resultList)
    {
      responseList.Add(MapResultToResponse(result));
    }

    return responseList;
  }

  public LocationResponse MapResultToResponse(LocationResult result)
  {
    var geometry = new LocationGeometry(
      new[] { result.Location.Longitude, result.Location.Latitude }
    );

    var properties = new LocationProperties
    (
      result.Location.Title,
      result.Location.Description,
      result.Location.Image.Replace(AzureProvider.AzureBlobStorageServer, AzureProvider.AzureCDNserver),
      result.Location.Status,
      result.Location.Rating,
      result.Location.Categories
    );

    return new LocationResponse(result.Location.Id, "Feature", properties, geometry);
  }

  public UpdateLocationCommand MapUpdateToCommand(UpdateLocationRequest request)
  {
    return new UpdateLocationCommand(
      request.Id,
      request.Title,
      request.Description,
      request.Image,
      request.Status,
      request.Longitude,
      request.Latitude,
      request.Category
    );
  }
}
