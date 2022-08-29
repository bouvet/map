namespace restapi.Interfaces
{
  public interface IParkService
  {
    Task<ServiceResponse<List<Park>>> GetAllParks();
  }
}