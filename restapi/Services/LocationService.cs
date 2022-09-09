using System.Reflection.Emit;
using System.Linq;
using System.Net.Security;
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

        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status201Created, "Location successfully added!", data: LocationResponseBuilder(location));
      }
      catch (Exception)
      {
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status500InternalServerError);
      }
    }

    public async Task<ServiceResponse<DeleteLocationDto>> DeleteLocation(Guid id)
    {
      var location = await dataContext.Locations.FindAsync(id);
      if (location is null)
      {
        return new ServiceResponse<DeleteLocationDto>(StatusCodes.Status404NotFound, Message: $"Location with id {id} was not found");
      }

      dataContext.Locations.Remove(location);
      await dataContext.SaveChangesAsync();

      return new ServiceResponse<DeleteLocationDto>(StatusCodes.Status204NoContent);
    }

    public async Task<ServiceResponse<List<LocationResponseDto>>> GetAllLocations()
    {
      var locations = await dataContext.Locations.Include("Reviews").ToListAsync();
      var transformedLocations = new List<LocationResponseDto>();

      foreach (Location location in locations)
      {
        var transformedLocation = LocationResponseBuilder(location);
        transformedLocations.Add(transformedLocation);
      }

      return new ServiceResponse<List<LocationResponseDto>>(StatusCodes.Status200OK, data: transformedLocations);
    }

    public async Task<ServiceResponse<LocationResponseDto>> GetLocationById(Guid id)
    {
      var location = await dataContext.Locations.FindAsync(id);

      if (location is null)
      {
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, Message: $"Location with id {id} was not found");
      }

      return new ServiceResponse<LocationResponseDto>(StatusCodes.Status200OK, data: LocationResponseBuilder(location));
    }

    public async Task<ServiceResponse<LocationResponseDto>> UpdateLocation(Guid id, UpdateLocationDto request)
    {
      try
      {
        var location = await dataContext.Locations.FindAsync(id);

        if (location is null)
        {
          return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, Message: $"Location with id {id} was not found");
        }

        if (request.Geometry.Coordinates != Array.Empty<double>() && request.Geometry.Coordinates.Count() > 0)
        {
          if (request.Geometry.Coordinates.Length != 2)
          {
            return new ServiceResponse<LocationResponseDto>(StatusCodes.Status400BadRequest, Message: "too many or too few args given; use long,lat in coordinates");
          }

          if (request.Geometry.Coordinates[0] > 0)
          {
            location.Longitude = request.Geometry.Coordinates[0];
          }

          if (request.Geometry.Coordinates[1] > 0)
          {
            location.Latitude = request.Geometry.Coordinates[1];
          }
        }

        Func<string, string, string> assign = (string a, string b) => string.IsNullOrEmpty(b) ? a : b;
        location.Title = assign(location.Title, request.Properties.Title);
        location.Description = assign(location.Description, request.Properties.Description);
        location.Img = assign(location.Img, request.Properties.Img);
        location.Status = assign(location.Status, request.Properties.Status);

        // TODO: remove rating from update dto when using db stored procedure.
        if (request.Properties.Rating > 0)
        {
          location.Rating = request.Properties.Rating;
        }


        if (request.Properties.Category != null && request.Properties.Category.Count > 0)
        {
          foreach (Guid categoryId in request.Properties.Category)
          {
            var category = await dataContext.Categories.FindAsync(categoryId);
            if (category == null)
            {
              return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, $"Category '{categoryId}' was not found");
            }
            location.Categories.Add(category);
          }
        }
        else
        {
          location.Categories = new List<Category>();
        }

        await dataContext.SaveChangesAsync();

        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status200OK, Message: "Location successfully updated!", data: LocationResponseBuilder(location));

      }
      catch (Exception)
      {
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status500InternalServerError);
      }

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