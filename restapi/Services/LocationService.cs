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
          Category = location.Categories,
          Status = location.Status
        };


        response.Data = new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties };
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
            Category = location.Categories,
            Status = location.Status
          };

          var transformedLocation = new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties };

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
          Category = location.Categories,
          Status = location.Status
        };

        response.Data = new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties };
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

    public async Task<ServiceResponse<List<LocationResponseDto>>> GetLocationByStatus(string status)
    {
      var response = new ServiceResponse<List<LocationResponseDto>>();
      try
      {
        var locations = await dataContext.Locations.Where(location => location.Status == status).ToListAsync();
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
            Category = location.Categories,
            Status = location.Status
          };

          var transformedLocation = new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties };

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

    public async Task<ServiceResponse<LocationResponseDto>> UpdateLocation(int id, UpdateLocationDto request)
    {
      var response = new ServiceResponse<LocationResponseDto>();
      var properties = new Properties { };
      var geometry = new Geometry();

      try
      {
        if (id < 1)
        {
          response.StatusCode = 400;
          throw new Exception("id field needs to be a number and greater than 0");
        }

        var location = await dataContext.Locations.FindAsync(id);

        if (location is null)
        {
          throw new Exception($"Location with id {id} was not found");
        }

        if (request.Geometry.Coordinates.Length > 2)
        {
          response.StatusCode = 400;
          throw new Exception("geometry.coordinates supported formats: [], [0, double], [double, 0], [double, double]");
        }

        // [5.5345, 0]
        if (request.Geometry.Coordinates[0] > 0 && request.Geometry.Coordinates[1] == 0)
          location.Longitude = request.Geometry.Coordinates[0];

        // [0, 58.2342]
        if (request.Geometry.Coordinates[0] == 0 && request.Geometry.Coordinates[1] > 0)
          location.Latitude = request.Geometry.Coordinates[1];

        // [5.2342, 58.3242]
        if (request.Geometry.Coordinates[1] > 0 && request.Geometry.Coordinates[1] > 0)
        {
          location.Longitude = request.Geometry.Coordinates[0];
          location.Latitude = request.Geometry.Coordinates[1];
        }

        geometry.Coordinates = new[] { location.Longitude, location.Latitude };

        if (!string.IsNullOrEmpty(request.Properties.Title))
        {
          properties.Title = request.Properties.Title;
          location.Title = request.Properties.Title;
        }

        if (!string.IsNullOrEmpty(request.Properties.Description))
        {
          properties.Description = request.Properties.Description;
          location.Description = request.Properties.Description;
        }

        if (!string.IsNullOrEmpty(request.Properties.Img))
        {
          properties.Img = request.Properties.Img;
          location.Img = request.Properties.Img;
        }

        if (!string.IsNullOrEmpty(request.Properties.Status))
        {
          properties.Status = request.Properties.Status;
          location.Status = request.Properties.Status;
        }

        if (request.Properties.Rating > 0)
        {
          properties.Rating = request.Properties.Rating;
          location.Rating = request.Properties.Rating;
        }
        //TODO: Change from CategoryIds to Category! When client sends data there will be full Category objects!
        if (request.Properties.Category.Count > 0)
        {
          location.Categories = new List<Category>();
          foreach (Category category in request.Properties.Category)
          {
            var _category = await dataContext.Categories.FindAsync(category.Id);
            if (_category == null)
              throw new Exception($"Category with id {category.Id} was not found");
            location.Categories.Add(_category);
          }
          properties.Category = location.Categories;
        }
        else
        {
          location.Categories = new List<Category>();
        }


        await dataContext.SaveChangesAsync();

        response.Data = new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties };
        response.Success = true;
        response.StatusCode = StatusCodes.Status200OK;
      }
      catch (Exception exception)
      {
        response.Data = null;
        response.Success = false;
        response.StatusCode = StatusCodes.Status404NotFound;
        response.Message = exception.Message;
      }

      return response;
    }
  }
}