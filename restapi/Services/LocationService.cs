namespace restapi.Services
{
  public class LocationService : ILocationService
  {
    private readonly DataContext dataContext;

    public LocationService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }

    public async Task<ServiceResponse<List<Location>>> GetAllLocations()
    {
      var response = new ServiceResponse<List<Location>> { };
      var locations = await dataContext.Locations.ToListAsync();
      response.Data = locations;
      response.StatusCode = 200;
      response.Success = true;
      return response;
    }

    public async Task<ServiceResponse<Location>> GetLocationById(int id)
    {
      var response = new ServiceResponse<Location> { };

      try
      {
        var location = await dataContext.Locations.FirstOrDefaultAsync(location => location.Id == id);
        if (location is null)
        {
          throw new Exception($"Location with id {id} was not found");
        }

        response.Data = location;
        response.Success = true;
      }
      catch (Exception exception)
      {
        response.Data = null;
        response.Success = false;
        response.StatusCode = 404;
        response.Message = exception.Message;
      }

      return response;
    }
  }
}