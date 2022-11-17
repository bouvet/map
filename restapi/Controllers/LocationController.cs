using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Providers.Authorization;
using restapi.Common.Services.Mappers.Locations;
using restapi.Contracts.Locations;
using restapi.Data;
using restapi.Services.Locations.Commands.Delete;
using restapi.Services.Locations.Common;
using restapi.Services.Locations.Queries.GetLocations;

namespace restapi.Controllers;

public class LocationsController : ApiController
{
  private readonly ISender mediator;
  private readonly ILocationMapper locationMapper;
  private readonly IAuthorizationProvider authorizationProvider;
  private readonly DataContext dataContext;

  public LocationsController(ISender mediator, ILocationMapper locationMapper, IAuthorizationProvider authorizationProvider, DataContext dataContext)
  {
    this.mediator = mediator;
    this.locationMapper = locationMapper;
    this.authorizationProvider = authorizationProvider;
    this.dataContext = dataContext;
  }

  [HttpPost]
  public async Task<IActionResult> CreateLocation([FromForm] CreateLocationRequest request)
  {
    var userId = HttpContext.User.FindFirst("userId")?.Value;

    var createLocationCommand = locationMapper.MapCreateRequestToCommand(request, userId ?? "");

    ErrorOr<LocationResult> createLocationCommandResult = await mediator.Send(createLocationCommand);

    return createLocationCommandResult.Match(
      result => CreatedAtGetLocation(result),
      errors => Problem(errors)
    );
  }

  [HttpGet("{status}")]
  public async Task<IActionResult> GetLocations(string status = "approved")
  {
    var getLocationsQuery = new GetLocationsQuery(status.ToLower());

    ErrorOr<List<LocationResult>> getLocationsResult = await mediator.Send(getLocationsQuery);

    return getLocationsResult.Match(
      result => Ok(locationMapper.MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet("{latitude}&{longitude}")]
  public async Task<IActionResult> GetLocationByProximity(double latitude, double longitude, Guid categoryId)
  {
    var getLocationByProximityQuery = locationMapper.MapGetByProximityToCommand(latitude, longitude, categoryId);

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
  [Authorize(Roles = "User, Administrator")]
  [HttpPut("{id:guid}")]
  public async Task<IActionResult> UpdateLocation(Guid id, [FromForm] UpdateLocationRequest request)
  {
    var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, id);

    if (!string.IsNullOrEmpty(request.Status) && !authResult.IsAdmin)
    {
      return Forbid();
    }

    var location = await dataContext.Locations.FindAsync(id);

    if (!authResult.IsAdmin && location?.Creator?.Id != authResult.UserId)
    {
      return Forbid();
    }

    var updateLocationCommand = locationMapper.MapUpdateToCommand(request, location, authResult.UserId);

    ErrorOr<Updated> updateLocationResult = await mediator.Send(updateLocationCommand);

    return updateLocationResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "User, Administrator")]
  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteLocation(Guid id)
  {
    var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, id);

    var location = await dataContext.Locations.FindAsync(id);

    if (!authResult.IsAdmin && location?.Creator?.Id != authResult.UserId)
    {
      return Forbid();
    }

    var deleteLocationCommand = new DeleteLocationCommand(location);

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