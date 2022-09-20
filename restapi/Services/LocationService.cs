using Microsoft.WindowsAzure.Storage.Blob;
using GeoCoordinatePortable;

namespace VerdenVenter.Services
{
  public class LocationService : ILocationService
  {
    private readonly DataContext dataContext;

    public LocationService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }

    public async Task<ServiceResponse<LocationResponseDto>> AddLocation(AddLocationDto request)
    {
      try
      {
        var location = new Location
        {
          Id = Guid.NewGuid(),
          Title = request.Title,
          Description = request.Description,
          Longitude = request.Longitude,
          Latitude = request.Latitude,
          Rating = request.Rating,
        };

        if (request.Category?.Count > 0)
        {
          foreach (Guid categoryId in request.Category)
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

        if (request.Img != null)
        {
          CloudBlockBlob blob = await BlobService.UploadFile(request.Img);
          location.Img = blob.Uri.ToString();
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

    public async Task<ServiceResponse<LocationResponseDto>> GetClosestLocation(double latitude, double longitude, Guid categoryId)
    {
      var locations = await dataContext.Locations.ToListAsync();
      var _category = await dataContext.Categories.FindAsync(categoryId);

      var coord = new GeoCoordinate(latitude, longitude);

      Console.WriteLine(categoryId + " is " + (categoryId == Guid.Empty));

      var locationsWithCategory = locations.Where(x => (x.Categories.Exists(x => x.Id == categoryId) || (Guid.Empty == categoryId)));
      if (!locationsWithCategory.Any())
      {
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, $"no locations with category id {categoryId}");
      }
      var nearest = locationsWithCategory.Select(x => new GeoCoordinate(x.Latitude, x.Longitude))
                      .OrderBy(x => x.GetDistanceTo(coord))
                      .First();

      var nearestLocation = locations.Where(l => l.Latitude == nearest.Latitude && l.Longitude == nearest.Longitude);
      return new ServiceResponse<LocationResponseDto>(StatusCodes.Status200OK, data: LocationResponseBuilder(nearestLocation.First()));
    }

    public async Task<ServiceResponse<LocationResponseDto>> UpdateLocation(UpdateLocationDto request)
    {
      try
      {
        var location = await dataContext.Locations.FindAsync(request.Id);

        if (location is null)
        {
          return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, Message: $"Location with id {request.Id} was not found");
        }

        location = MapUpdatedLocation(location, request);

        if (request.Category?.Count > 0)
        {
          location.Categories = new List<Category>();

          foreach (Guid categoryId in request.Category)
          {
            var category = await dataContext.Categories.FindAsync(categoryId);
            if (category == null)
            {
              return new ServiceResponse<LocationResponseDto>(StatusCodes.Status404NotFound, $"Category '{categoryId}' was not found");
            }

            location.Categories.Add(category);
          }
        }

        if (request.Img is not null)
        {
          CloudBlockBlob blob = await BlobService.UploadFile(request.Img);
          location.Img = blob.Uri.ToString();
        }

        await dataContext.SaveChangesAsync();

        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status200OK, Message: "Location successfully updated!", data: LocationResponseBuilder(location));
      }
      catch (Exception)
      {
        return new ServiceResponse<LocationResponseDto>(StatusCodes.Status500InternalServerError);
      }
    }

    private static Location MapUpdatedLocation(Location location, UpdateLocationDto request)
    {
      location.Title = string.IsNullOrEmpty(request.Title) ? location.Title : request.Title;
      location.Description = string.IsNullOrEmpty(request.Description) ? location.Description : request.Description;
      location.Status = string.IsNullOrEmpty(request.Status) ? location.Status : request.Status;

      location.Longitude = request.Longitude is not > 0 ? location.Longitude : request.Longitude;
      location.Latitude = request.Latitude is not > 0 ? location.Latitude : request.Latitude;

      return location;
    }

    private static LocationResponseDto LocationResponseBuilder(Location location)
    {
      var geometry = new LocationGeometryDto
      {
        Coordinates = new[] { location.Longitude, location.Latitude }
      };

      const string azureBlobStorageServer = ".blob.core.windows.net";
      const string azureCDNserver = ".azureedge.net";

      var properties = new LocationPropertiesDto
      {
        Title = location.Title,
        Description = location.Description,
        Img = location.Img.Replace(azureBlobStorageServer, azureCDNserver),
        Rating = location.Rating,
        Category = location.Categories,
        Status = location.Status
      };

      return new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties };
    }
  }
}