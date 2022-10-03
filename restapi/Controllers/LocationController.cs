using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Services.Mappers.Locations;
using restapi.Contracts.Locations;
using restapi.Services.Locations.Common;

namespace restapi.Controllers;

public class LocationsController : ApiController
{
  private readonly ISender mediator;
  private readonly ILocationMapper locationMapper;

  public LocationsController(ISender mediator, ILocationMapper locationMapper)
  {
    this.mediator = mediator;
    this.locationMapper = locationMapper;
  }

  [HttpPost]
  public async Task<IActionResult> CreateLocation([FromForm] CreateLocationRequest request)
  {
    var createLocationCommand = locationMapper.MapCreateRequestToCommand(request);

    ErrorOr<LocationResult> createLocationCommandResult = await mediator.Send(createLocationCommand);

    return createLocationCommandResult.Match(
      result => CreatedAtGetLocation(result),
      errors => Problem(errors)
    );
  }

  [HttpGet]
  public async Task<IActionResult> GetLocations()
  {
    var getLocationsQuery = locationMapper.MapGetLocationsQueryToCommand();
    ErrorOr<List<LocationResult>> getLocationsResult = await mediator.Send(getLocationsQuery);

    return getLocationsResult.Match(
      result => Ok(locationMapper.MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet("{latitude}&{longitude}/category")]
  public async Task<IActionResult> GetLocationByProximity(GetLocationByProximityRequest request)
  {
    var getLocationByProximityQuery = locationMapper.MapGetByProximityToCommand(request);

    ErrorOr<LocationResult> getClosestLocationResult = await mediator.Send(getLocationByProximityQuery);

    return getClosestLocationResult.Match(
      result => Ok(locationMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetLocationById(Guid id)
  {
    var getLocationByIdQuery = locationMapper.MapGetByIdToCommand(id);

    ErrorOr<LocationResult> getLocationByIdResult = await mediator.Send(getLocationByIdQuery);

    return getLocationByIdResult.Match(
      result => Ok(locationMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  //TODO: Lock this so only creator and administrator can update?
  [HttpPut]
  public async Task<IActionResult> UpdateLocation([FromForm] UpdateLocationRequest request)
  {
    var updateLocationCommand = locationMapper.MapUpdateToCommand(request);

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
    var deleteLocationCommand = locationMapper.MapDeleteToCommand(id);

    ErrorOr<Deleted> deleteLocationResult = await mediator.Send(deleteLocationCommand);

    return deleteLocationResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private CreatedAtActionResult CreatedAtGetLocation(LocationResult result)
  {
    return CreatedAtAction(
        actionName: nameof(GetLocationById),
        routeValues: new { id = result.Location.Id },
        value: locationMapper.MapResultToResponse(result)
      );
  }
}