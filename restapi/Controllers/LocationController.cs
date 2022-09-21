using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using restapi.Dtos;
using restapi.Services.Locations;

namespace restapi.Controllers;

public class LocationsController : ApiController
{
  private readonly ILocationService locationService;

  public LocationsController(ILocationService locationService)
  {
    this.locationService = locationService;
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

  [HttpPost]
  public async Task<IActionResult> AddLocation([FromForm] AddLocationDto request)
  {
    ErrorOr<LocationResponseDto> addLocationResult = await locationService.AddLocation(request);

    return addLocationResult.Match(
      location => CreatedAtGetLocation(location),
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
    ErrorOr<Deleted> deleteLocationResult = await locationService.DeleteLocation(id);

    return deleteLocationResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private CreatedAtActionResult CreatedAtGetLocation(LocationResponseDto location)
  {
    return CreatedAtAction(
        actionName: nameof(GetLocationById),
        routeValues: new { id = location.Id },
        value: location
      );
  }
}