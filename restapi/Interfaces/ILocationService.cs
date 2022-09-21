using ErrorOr;

namespace restapi.Interfaces
{
  public interface ILocationService
  {
    Task<ErrorOr<LocationResponseDto>> GetClosestLocation(double latitude, double longitude, Guid categoryId);
    Task<ErrorOr<List<LocationResponseDto>>> GetLocations();
    Task<ErrorOr<LocationResponseDto>> GetLocationById(Guid id);
    Task<ErrorOr<LocationResponseDto>> AddLocation(AddLocationDto request);
    Task<ErrorOr<Deleted>> DeleteLocation(Guid id);
    Task<ErrorOr<Updated>> UpdateLocation(UpdateLocationDto request);
  }
}