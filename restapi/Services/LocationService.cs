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
      try
      {
        var locations = await dataContext.Locations.ToListAsync();
        if (locations is not null)
        {
          response.Data = locations;
          response.Success = true;
        }
      }
      catch (Exception exception)
      {
        response.Data = null;
        response.Success = false;
        response.Message = exception.Message;
      }

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
        response.Message = exception.Message;
      }

      return response;
    }
  }
}