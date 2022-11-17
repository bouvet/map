using restapi.Contracts.Locations;
using restapi.Entities;
using restapi.Services.Locations.Commands.Create;
using restapi.Services.Locations.Commands.Update;
using restapi.Services.Locations.Common;
using restapi.Services.Locations.Queries.GetLocationById;
using restapi.Services.Locations.Queries.GetLocationByProximity;
using restapi.Services.Locations.Queries.GetLocations;

namespace restapi.Common.Services.Mappers.Locations;

public interface ILocationMapper
{
  CreateLocationCommand MapCreateRequestToCommand(CreateLocationRequest request, string userId);
  GetLocationByProximityQuery MapGetByProximityToCommand(double latitude, double longitude, Guid categoryId);
  GetLocationByIdQuery MapGetByIdToCommand(Guid id);
  UpdateLocationCommand MapUpdateToCommand(UpdateLocationRequest request, Location? location, Guid? userId);
  LocationResponse MapResultToResponse(LocationResult result);
  List<LocationResponse> MapResultListToResponseList(List<LocationResult> resultList);
}