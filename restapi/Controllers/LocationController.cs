using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Providers;
using restapi.Common.Services;
using restapi.Contracts.Locations;
using restapi.Services.Locations.Commands.Create;
using restapi.Services.Locations.Commands.Delete;
using restapi.Services.Locations.Commands.Update;
using restapi.Services.Locations.Common;
using restapi.Services.Locations.Queries.GetLocationById;
using restapi.Services.Locations.Queries.GetLocationByProximity;
using restapi.Services.Locations.Queries.GetLocations;

namespace restapi.Controllers;

public class LocationsController : ApiController
{
  private readonly ISender mediator;
  private readonly IAzureBlobStorage azureBlobStorage;

  public LocationsController(ISender mediator, IAzureBlobStorage azureBlobStorage)
  {
    this.mediator = mediator;
    this.azureBlobStorage = azureBlobStorage;
  }

  [Authorize(Roles = "Administrator")]
  [HttpPost]
  public async Task<IActionResult> CreateLocation([FromForm] CreateLocationRequest request)
  {
    var createLocationCommand = new CreateLocationCommand(
      request.Title,
      request.Description,
      request.Image,
      request.Longitude,
      request.Latitude,
      request.Category
    );

    ErrorOr<LocationResult> createLocationCommandResult = await mediator.Send(createLocationCommand);

    return createLocationCommandResult.Match(
      result => CreatedAtGetLocation(result),
      errors => Problem(errors)
    );
  }

  [HttpGet]
  public async Task<IActionResult> GetLocations()
  {
    var getLocationsQuery = new GetLocationsQuery();
    ErrorOr<List<LocationResult>> getLocationsResult = await mediator.Send(getLocationsQuery);

    return getLocationsResult.Match(
      result => Ok(MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet("{latitude}&{longitude}/category")]
  public async Task<IActionResult> GetLocationByProximity(double latitude, double longitude, Guid categoryId)
  {
    var getLocationByProximityQuery = new GetLocationByProximityQuery(latitude, longitude, categoryId);

    ErrorOr<LocationResult> getClosestLocationResult = await mediator.Send(getLocationByProximityQuery);

    return getClosestLocationResult.Match(
      result => Ok(MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetLocationById(Guid id)
  {
    var getLocationByIdQuery = new GetLocationByIdQuery(id);

    ErrorOr<LocationResult> getLocationByIdResult = await mediator.Send(getLocationByIdQuery);

    return getLocationByIdResult.Match(
      result => Ok(MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "Administrator")]
  [HttpPut]
  public async Task<IActionResult> UpdateLocation([FromForm] UpdateLocationRequest request)
  {
    var updateLocationCommand = new UpdateLocationCommand(
      request.Id,
      request.Title,
      request.Description,
      request.Image,
      request.Status,
      request.Longitude,
      request.Latitude,
      request.Category
    );

    ErrorOr<Updated> updateLocationResult = await mediator.Send(updateLocationCommand);

    return updateLocationResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "Administrator")]
  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteLocation(Guid id)
  {
    ErrorOr<Deleted> deleteLocationResult = await mediator.Send(new DeleteLocationCommand(id));

    return deleteLocationResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private static LocationResponse MapResultToResponse(LocationResult result)
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

  private static List<LocationResponse> MapResultListToResponseList(List<LocationResult> resultList)
  {
    var mappedList = new List<LocationResponse>();

    foreach (LocationResult result in resultList)
    {
      mappedList.Add(MapResultToResponse(result));
    }

    return mappedList;
  }

  private CreatedAtActionResult CreatedAtGetLocation(LocationResult result)
  {
    return CreatedAtAction(
        actionName: nameof(GetLocationById),
        routeValues: new { id = result.Location.Id },
        value: MapResultToResponse(result)
      );
  }
}