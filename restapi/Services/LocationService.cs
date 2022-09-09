using Microsoft.WindowsAzure.Storage.Blob;

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
      // var response = new ServiceResponse<LocationResponseDto> { };

      try
      {
        Location location = new Location
        {
          Id = Guid.NewGuid(),
          Title = request.Title,
          Description = request.Description,
          Longitude = request.Longitude,
          Latitude = request.Latitude,
          Rating = request.Rating,
        };

        if (request.Img != null)
        {
          CloudBlockBlob blob = await BlobService.UploadFile(location.Id, request.Img);
          location.Img = blob.Uri.ToString();
        }

        if (request.Category != null && request.Category.Count > 0)
        {
          foreach (Guid category in request.Category)
          {
            var _category = await dataContext.Categories.FindAsync(category);
            if (_category == null)
            {
              // response.StatusCode = StatusCodes.Status404NotFound;
              // throw new Exception($"Category '{category}' was not found");
              return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, $"Category '{category}' was not found");
            }
            location.Categories.Add(_category);
          }
        }
        else
        {
          location.Categories = new List<Category>();
        }

        dataContext.Locations.Add(location);
        await dataContext.SaveChangesAsync();

        // response.Data = LocationResponseBuilder(location);
        // response.StatusCode = StatusCodes.Status201Created;
        // response.Success = true;
        // response.Message = "Location successfully added!";
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status201Created, "Location successfully added!", data: LocationResponseBuilder(location));
      }
      catch (Exception)
      {
        // response.Data = null;
        // response.Success = false;
        // response.Message = exception.Message;
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status500InternalServerError);
      }

      // return response;
    }

    public async Task<ServiceResponse<DeleteLocationDto>> DeleteLocation(Guid id)
    {
      // var response = new ServiceResponse<DeleteLocationDto>();

      var location = await dataContext.Locations.FindAsync(id);
      if (location is null)
      {
        // response.StatusCode = 404;
        // response.Message = "Location was not found!";
        // return response;
        return new ServiceResponse<DeleteLocationDto>(StatusCodes.Status404NotFound, Message: $"Location with id {id} was not found");
      }
      dataContext.Locations.Remove(location);
      await dataContext.SaveChangesAsync();
      // response.Success = true;
      // response.Message = "";
      // response.StatusCode = StatusCodes.Status204NoContent;
      // return response;
      return new ServiceResponse<DeleteLocationDto>(StatusCodes.Status204NoContent);
    }

    public async Task<ServiceResponse<List<LocationResponseDto>>> GetAllLocations()
    {
      // var response = new ServiceResponse<List<LocationResponseDto>>();

      var locations = await dataContext.Locations.Include("Reviews").ToListAsync();
      var transformedLocations = new List<LocationResponseDto>();

      foreach (Location location in locations)
      {
        var transformedLocation = LocationResponseBuilder(location);
        transformedLocations.Add(transformedLocation);
      }

      // response.Data = transformedLocations;
      // response.Success = true;
      // response.Message = "";
      // response.StatusCode = StatusCodes.Status200OK;
      return new ServiceResponse<List<LocationResponseDto>>(StatusCodes.Status200OK, data: transformedLocations);

      // return response;
    }

    public async Task<ServiceResponse<LocationResponseDto>> GetLocationById(Guid id)
    {
      // var response = new ServiceResponse<LocationResponseDto>();

      var location = await dataContext.Locations.FindAsync(id);

      if (location is null)
      {
        // response.Message = $"Location with id {id} was not found";
        // response.StatusCode = StatusCodes.Status404NotFound;
        // return response;
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, Message: $"Location with id {id} was not found");
      }

      // response.Data = LocationResponseBuilder(location);
      // response.Success = true;
      // response.Message = "";
      // response.StatusCode = StatusCodes.Status200OK;
      // return response;
      return new ServiceResponse<LocationResponseDto>(StatusCodes.Status200OK, data: LocationResponseBuilder(location));
    }

    public async Task<ServiceResponse<LocationResponseDto>> UpdateLocation(Guid id, UpdateLocationDto request)
    {
      // var response = new ServiceResponse<LocationResponseDto>();
      var properties = new LocationPropertiesDto { };
      var geometry = new LocationGeometryDto();

      try
      {
        var location = await dataContext.Locations.FindAsync(id);

        if (location is null)
        {
          // response.Message = "Location was not found";
          // response.StatusCode = StatusCodes.Status404NotFound;
          // return response;
          return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, Message: $"Location with id {id} was not found");
        }

        if (request.Geometry.Coordinates.Length > 2)
        {
          // response.StatusCode = StatusCodes.Status400BadRequest;
          // return response;
          return new ServiceResponse<LocationResponseDto>(StatusCodes.Status400BadRequest, Message: "both longitude and latatitude is required");
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

        if (request.Properties.Category.Count > 0)
        {
          location.Categories = new List<Category>();

          foreach (Category category in request.Properties.Category)
          {
            var _category = await dataContext.Categories.FindAsync(category.Id);
            if (_category == null)
            {
              // throw new Exception($"Category was not found");
              return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, $"Category with id {category.Id} was not found");
            }
            location.Categories.Add(_category);
          }
          properties.Category = location.Categories;
        }
        else
        {
          location.Categories = new List<Category>();
        }


        await dataContext.SaveChangesAsync();

        // response.Data = new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties };
        // response.Success = true;
        // response.Message = "Location successfully updated!";
        // response.StatusCode = StatusCodes.Status200OK;
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status200OK, Message: "Location successfully updated!", data: new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties });

      }
      catch (Exception)
      {
        // return response;
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status500InternalServerError);
      }

      // return response;
    }

    private LocationResponseDto LocationResponseBuilder(Location location)
    {
      var geometry = new LocationGeometryDto();
      geometry.Coordinates = new[] { location.Longitude, location.Latitude };

      var properties = new LocationPropertiesDto
      {
        Title = location.Title,
        Description = location.Description,
        Img = location.Img,
        Rating = location.Rating,
        Category = location.Categories,
        Status = location.Status
      };
      var response = new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties };
      return response;
    }
  }
}