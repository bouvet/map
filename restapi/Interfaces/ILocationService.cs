namespace restapi.Interfaces
{
  public interface ILocationService
  {
    Task<ServiceResponse<List<LocationResponseDto>>> GetAllLocations();
    Task<ServiceResponse<LocationResponseDto>> GetLocationById(Guid id);
    Task<ServiceResponse<LocationResponseDto>> AddLocation(AddLoctionDto newLocation);
    Task<ServiceResponse<DeleteLocationDto>> DeleteLocation(Guid id);
    Task<ServiceResponse<LocationResponseDto>> UpdateLocation(Guid id, UpdateLocationDto updatedLocation);
  }
}