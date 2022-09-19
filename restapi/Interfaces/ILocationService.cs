namespace restapi.Interfaces
{
  public interface ILocationService
  {
    Task<ServiceResponse<LocationResponseDto>> GetClosestLocation(double latitude, double longitude, Guid categoryId);
    Task<ServiceResponse<List<LocationResponseDto>>> GetAllLocations();
    Task<ServiceResponse<LocationResponseDto>> GetLocationById(Guid id);
    Task<ServiceResponse<LocationResponseDto>> AddLocation(AddLocationDto newLocation);
    Task<ServiceResponse<DeleteLocationDto>> DeleteLocation(Guid id);
    Task<ServiceResponse<LocationResponseDto>> UpdateLocation(Guid id, UpdateLocationDto updatedLocation);
  }
}