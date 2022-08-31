namespace restapi.Services
{
  public class LocationService : ILocationService
  {
    private readonly DataContext dataContext;

    public LocationService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }

    public async Task<ServiceResponse<LocationResponseDto>> AddLocation(AddLoctionDto request)
    {
      var response = new ServiceResponse<LocationResponseDto>();

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

        dataContext.Locations.Add(location);
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


        response.Data = new LocationResponseDto { Geometry = geometry, Properties = properties };
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

    public async Task<ServiceResponse<ServiceResponseDto>> DeleteLocation(int id)
    {
      var response = new ServiceResponse<ServiceResponseDto>();
      try
      {
        var location = await dataContext.Locations.FindAsync(id);
        if (location is null)
        {
          response.StatusCode = 404;
          throw new Exception($"Location with id {id} was not found!");
        }
        dataContext.Locations.Remove(location);
        await dataContext.SaveChangesAsync();
        response.StatusCode = 200;
      }
      catch (Exception exception)
      {
        response.Message = exception.Message;
      }
      return response;
    }

    public async Task<ServiceResponse<List<LocationResponseDto>>> GetAllLocations()
    {
      var response = new ServiceResponse<List<LocationResponseDto>>();
      try
      {
        var locations = await dataContext.Locations.ToListAsync();
        var transformedLocations = new List<LocationResponseDto>();

        foreach (Location location in locations)
        {
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

          var transformedLocation = new LocationResponseDto { Geometry = geometry, Properties = properties };

          transformedLocations.Add(transformedLocation);
        }

        response.Data = transformedLocations;
        response.StatusCode = 200;
        response.Success = true;
      }
      catch (Exception)
      {
        response.Data = null;
        response.StatusCode = 500;
        response.Message = "Something went wrong, please try again";
      }

      return response;
    }

    public async Task<ServiceResponse<LocationResponseDto>> GetLocationById(int id)
    {
      var response = new ServiceResponse<LocationResponseDto>();

      try
      {
        var location = await dataContext.Locations.FirstOrDefaultAsync(location => location.Id == id);
        if (location is null)
        {
          throw new Exception($"Location with id {id} was not found");
        }

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

        response.Data = new LocationResponseDto { Geometry = geometry, Properties = properties };
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