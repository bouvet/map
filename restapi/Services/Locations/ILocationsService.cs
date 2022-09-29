using ErrorOr;
using restapi.Dtos.Locations;

namespace restapi.Services.Locations;

public interface ILocationService
{
  Task<ErrorOr<LocationResponseDto>> GetClosestLocation(double latitude, double longitude, Guid categoryId);
  Task<ErrorOr<List<LocationResponseDto>>> GetLocations();
  Task<ErrorOr<LocationResponseDto>> GetLocationById(Guid id);
  Task<ErrorOr<Updated>> UpdateLocation(UpdateLocationDto request);
}