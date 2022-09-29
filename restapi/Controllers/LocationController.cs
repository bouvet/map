using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Services;
using restapi.Contracts.Locations;
using restapi.Dtos.Locations;
using restapi.Services.Locations;
using restapi.Services.Locations.Command.Create;
using restapi.Services.Locations.Command.Delete;
using restapi.Services.Locations.Command.UpdateImage;
using restapi.Services.Locations.Common;
using SkiaSharp;

namespace restapi.Controllers;

public class LocationsController : ApiController
{
  private readonly ILocationService locationService;
  private readonly IMapper mapper;
  private readonly ISender mediator;
  private readonly IAzureBlobStorage azureBlobStorage;

  public LocationsController(ILocationService locationService, IMapper mapper, ISender mediator, IAzureBlobStorage azureBlobStorage)
  {
    this.locationService = locationService;
    this.mapper = mapper;
    this.mediator = mediator;
    this.azureBlobStorage = azureBlobStorage;
  }

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
    ErrorOr<List<LocationResponseDto>> getLocationsResult = await locationService.GetLocations();

    return getLocationsResult.Match(
      locations => Ok(locations),
      errors => Problem(errors)
    );
  }

  [HttpGet("{latitude}&{longitude}/category")]
  public async Task<IActionResult> GetClosestLocation(double latitude, double longitude, Guid category)
  {
    ErrorOr<LocationResponseDto> getClosestLocationResult = await locationService.GetClosestLocation(latitude, longitude, category);

    return getClosestLocationResult.Match(
      location => Ok(location),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetLocationById(Guid id)
  {
    ErrorOr<LocationResponseDto> getLocationByIdResult = await locationService.GetLocationById(id);

    return getLocationByIdResult.Match(
      location => Ok(location),
      errors => Problem(errors)
    );
  }

  [HttpPut]
  public async Task<IActionResult> UpdateLocation([FromForm] UpdateLocationDto request)
  {
    ErrorOr<Updated> updateLocationResult = await locationService.UpdateLocation(request);

    return updateLocationResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteLocation(Guid id)
  {
    ErrorOr<Deleted> deleteLocationResult = await mediator.Send(new DeleteLocationCommand(id));

    return deleteLocationResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private CreatedAtActionResult CreatedAtGetLocation(LocationResult location)
  {
    var locationProperties = new LocationProperties(
      location.Title,
      location.Description,
      location.Image,
      location.Status,
      location.Rating,
      location.Category
    );
    var locationGeometry = new LocationGeometry(location.Coordinates);
    var locationResponse = new LocationResponse(
      location.Id,
      "Feature",
      locationProperties,
      locationGeometry
    );
    return CreatedAtAction(
        actionName: nameof(GetLocationById),
        routeValues: new { id = location.Id },
        value: locationResponse
      );
  }
}