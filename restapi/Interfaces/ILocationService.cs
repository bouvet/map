namespace restapi.Interfaces
{
  public interface ILocationService
  {
    Task<ServiceResponse<List<Location>>> GetAllLocations();
    Task<ServiceResponse<Location>> GetLocationById(int id);
  }
}