using restapi.Contracts.Locations;
using restapi.Services.Locations.Commands.Create;
using restapi.Services.Locations.Commands.Delete;
using restapi.Services.Locations.Commands.Update;
using restapi.Services.Locations.Common;
using restapi.Services.Locations.Queries.GetLocationById;
using restapi.Services.Locations.Queries.GetLocationByProximity;
using restapi.Services.Locations.Queries.GetLocations;

namespace restapi.Common.Services.Mappers.Locations;

public interface ILocationMapper
{
  CreateLocationCommand MapCreateRequestToCommand(CreateLocationRequest request);
  GetLocationsQuery MapGetLocationsQueryToCommand();
  GetLocationByProximityQuery MapGetByProximityToCommand(GetLocationByProximityRequest request);
  GetLocationByIdQuery MapGetByIdToCommand(Guid id);
  UpdateLocationCommand MapUpdateToCommand(UpdateLocationRequest request);
  DeleteLocationCommand MapDeleteToCommand(Guid id);
  LocationResponse MapResultToResponse(LocationResult result);
  List<LocationResponse> MapResultListToResponseList(List<LocationResult> resultList);
}