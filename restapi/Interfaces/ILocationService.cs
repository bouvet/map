using restapi.Dtos.Location;
namespace restapi.Interfaces
{
  public interface ILocationService
  {
    Task<ServiceResponse<List<LocationResponseDto>>> GetAllLocations();
    Task<ServiceResponse<LocationResponseDto>> GetLocationById(int id);
    Task<ServiceResponse<LocationResponseDto>> AddLocation(AddLoctionDto newLocation);
    Task<ServiceResponse<ServiceResponseDto>> DeleteLocation(int id);
    Task<ServiceResponse<LocationResponseDto>> UpdateLocation(int id, UpdateLocationDto updatedLocation);
    Task<ServiceResponse<List<LocationResponseDto>>> GetLocationByStatus(string status);
  }
}