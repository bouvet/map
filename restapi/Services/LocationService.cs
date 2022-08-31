namespace restapi.Services
{
  public class LocationService : ILocationService
  {
    private readonly DataContext dataContext;

    public LocationService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }

    public async Task<ServiceResponse<AddLocationResponseDto>> AddLocation(AddLoctionDto request)
    {
      var response = new ServiceResponse<AddLocationResponseDto>();

      try
      {
        if (request.CategoryIds is null || request.CategoryIds.Count == 0)
          throw new Exception($"Category ID(s) must be provided");

        var location = new Location
        {
          Title = request.Title,
          Description = request.Description,
          Img = request.Img,
          Latitude = request.Latitude,
          Longitude = request.Longitude,
          Rating = request.Rating,
        };


        foreach (int categoryId in request.CategoryIds)
        {
          var category = await dataContext.Categories.FindAsync(categoryId);
          if (category == null)
            throw new Exception($"Category with id {categoryId} was not found");
          location.Categories.Add(category);
        }

        await dataContext.SaveChangesAsync();

        var geometry = new Geometry();
        geometry.Coordinates = new[] { location.Longitude, location.Latitude };

        var properties = new Properties
        {
          Title = location.Title,
          Description = location.Description,
          Img = location.Img,
          Rating = location.Rating,
          Category = location.Categories
        };


        response.Data = new AddLocationResponseDto { Geometry = geometry, Properties = properties };
        response.StatusCode = 201;
        response.Success = true;
        response.Message = "Location successfully saved!";

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

    public async Task<ServiceResponse<List<Location>>> GetAllLocations()
    {
      var response = new ServiceResponse<List<Location>>();
      var locations = await dataContext.Locations.ToListAsync();
      response.Data = locations;
      response.StatusCode = 200;
      response.Success = true;
      return response;
    }

    public async Task<ServiceResponse<Location>> GetLocationById(int id)
    {
      var response = new ServiceResponse<Location>();

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