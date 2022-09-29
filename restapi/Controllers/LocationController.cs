using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Contracts.Locations;
using restapi.Dtos.Locations;
using restapi.Services.Locations;
using restapi.Services.Locations.Command.Create;
using restapi.Services.Locations.Common;

namespace restapi.Controllers;

public class LocationsController : ApiController
{
  private readonly ILocationService locationService;
  private readonly IMapper mapper;
  private readonly ISender mediator;

  public LocationsController(ILocationService locationService, IMapper mapper, ISender mediator)
  {
    this.locationService = locationService;
    this.mapper = mapper;
    this.mediator = mediator;
  }

  [HttpPost]
  public async Task<IActionResult> CreateLocation([FromForm] CreateLocationRequest request)
  {
    var createLocationCommand = mapper.Map<CreateLocationCommand>(request);

    ErrorOr<LocationResult> createLocationCommandResult = await mediator.Send(createLocationCommand);

    return createLocationCommandResult.Match(
      location => CreatedAtGetLocation(mapper.Map<LocationResponse>(location)),
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
    ErrorOr<Deleted> deleteLocationResult = await locationService.DeleteLocation(id);

    return deleteLocationResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private CreatedAtActionResult CreatedAtGetLocation(LocationResponse location)
  {
    return CreatedAtAction(
        actionName: nameof(GetLocationById),
        routeValues: new { id = location.Id },
        value: location
      );
  }
}