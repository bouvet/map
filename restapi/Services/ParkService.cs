namespace restapi.Services
{
  public class ParkService : IParkService
  {
    private readonly DataContext dataContext;

    public ParkService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }

    public async Task<ServiceResponse<List<Park>>> GetAllParks()
    {
      var response = new ServiceResponse<List<Park>> { };
      try
      {
        var parks = await dataContext.Parks.ToListAsync();
        if (parks is not null)
        {
          response.Data = parks;
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

    public async Task<ServiceResponse<Park>> GetParkById(int id)
    {
      var response = new ServiceResponse<Park> { };

      try
      {
        var park = await dataContext.Parks.FirstOrDefaultAsync(park => park.Id == id);
        if (park is not null)
        {
          response.Data = park;
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
  }
}