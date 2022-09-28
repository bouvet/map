using Microsoft.WindowsAzure.Storage.Blob;
using GeoCoordinatePortable;
using ErrorOr;
using restapi.Models;
using restapi.Data;
using Microsoft.EntityFrameworkCore;
using restapi.Services.AzureBlobStorage;
using restapi.Dtos.Locations;
using restapi.ServiceUtils.ServiceErrors;
using restapi.Common.Services.Settings;
using restapi.Common.Services.Providers;

namespace restapi.Services.Locations;

public class LocationService : ILocationService
{
  private readonly DataContext dataContext;
  private readonly IAzureBlobStorageService azureBlobStorageService;

  public LocationService(DataContext dataContext, IAzureBlobStorageService azureBlobStorageService)
  {
    this.dataContext = dataContext;
    this.azureBlobStorageService = azureBlobStorageService;
  }

  public async Task<ErrorOr<LocationResponseDto>> AddLocation(AddLocationDto request)
  {
    List<Error> errors = ValidateUserInput(request);

    if (errors.Count > 0)
    {
      return errors;
    }

    var location = new Location
    {
      Id = Guid.NewGuid(),
      Title = request.Title,
      Description = request.Description,
      Longitude = request.Longitude,
      Latitude = request.Latitude,
    };

    if (request.Category?.Count > 0)
    {
      foreach (Guid categoryId in request.Category)
      {
        var category = await dataContext.Categories.FindAsync(categoryId);

        if (category == null)
        {
          return Errors.Category.NotFound;
        }

        location.Categories.Add(category);
      }
    }
    else
    {
      location.Categories = new List<Category>();
    }

    if (request.Image is not null)
    {
      ErrorOr<CloudBlockBlob> fileUploadResult = await azureBlobStorageService.UploadFile(request.Image);

      if (fileUploadResult.IsError)
      {
        return Errors.AzureBlobStorage.UploadFailed;
      }

      location.Image = fileUploadResult.Value.Uri.ToString();
    }

    dataContext.Locations.Add(location);
    await dataContext.SaveChangesAsync();

    return MapToLocationResponse(location);
  }

  public async Task<ErrorOr<Deleted>> DeleteLocation(Guid id)
  {
    var location = await dataContext.Locations.FindAsync(id);

    if (location is null)
    {
      return Errors.Location.NotFound;
    }

    dataContext.Locations.Remove(location);
    await dataContext.SaveChangesAsync();

    return Result.Deleted;
  }

  public async Task<ErrorOr<List<LocationResponseDto>>> GetLocations()
  {
    var locations = await dataContext.Locations.Include("Reviews").ToListAsync();

    var transformedLocations = new List<LocationResponseDto>();

    foreach (Location location in locations)
    {
      var transformedLocation = MapToLocationResponse(location);
      transformedLocations.Add(transformedLocation);
    }

    return transformedLocations;
  }

  public async Task<ErrorOr<LocationResponseDto>> GetLocationById(Guid id)
  {
    var location = await dataContext.Locations.FindAsync(id);

    if (location is null)
    {
      return Errors.Location.NotFound;
    }

    return MapToLocationResponse(location);
  }

  public async Task<ErrorOr<LocationResponseDto>> GetClosestLocation(double latitude, double longitude, Guid categoryId)
  {
    var locations = await dataContext.Locations.ToListAsync();
    var _category = await dataContext.Categories.FindAsync(categoryId);

    var coord = new GeoCoordinate(latitude, longitude);

    var locationsWithCategory = locations.Where(x => x.Categories.Exists(x => x.Id == categoryId) || Guid.Empty == categoryId);

    if (!locationsWithCategory.Any())
    {
      return Errors.Location.NotFound;
    }

    var nearest = locationsWithCategory.Select(x => new GeoCoordinate(x.Latitude, x.Longitude))
                    .OrderBy(x => x.GetDistanceTo(coord))
                    .First();

    var nearestLocation = locations.Where(l => l.Latitude == nearest.Latitude && l.Longitude == nearest.Longitude);

    return MapToLocationResponse(nearestLocation.First());
  }

  public async Task<ErrorOr<Updated>> UpdateLocation(UpdateLocationDto request)
  {
    var location = await dataContext.Locations.FindAsync(request.Id);

    if (location is null)
    {
      return Errors.Location.NotFound;
    }

    ErrorOr<Location> mapUpdatedLocationResult = MapUpdatedLocation(location, request);

    if (mapUpdatedLocationResult.IsError)
    {
      return mapUpdatedLocationResult.Errors;
    }

    if (request.Category?.Count > 0)
    {
      location.Categories = new List<Category>();

      foreach (Guid categoryId in request.Category)
      {
        var category = await dataContext.Categories.FindAsync(categoryId);

        if (category == null)
        {
          return Errors.Category.NotFound;
        }

        location.Categories.Add(category);
      }
    }

    if (request.Image is not null)
    {
      ErrorOr<CloudBlockBlob> fileUploadResult = await azureBlobStorageService.UploadFile(request.Image);

      if (fileUploadResult.IsError)
      {
        return Errors.AzureBlobStorage.UploadFailed;
      }

      location.Image = fileUploadResult.Value.Uri.ToString();
    }

    await dataContext.SaveChangesAsync();

    return Result.Updated;
  }

  private static List<Error> ValidateUserInput(AddLocationDto request)
  {
    List<Error> errors = new();

    if (request.Title.Length is < Location.MinTitleLength or > Location.MaxTitleLength)
    {
      errors.Add(Errors.Location.InvalidTitle);
    }

    if (request.Description.Length is < Location.MinDescriptionLength or > Location.MaxDescriptionLength)
    {
      errors.Add(Errors.Location.InvalidDescription);
    }

    if (request.Longitude is < Location.MinLongitudeValue or > Location.MaxLongitudeValue)
    {
      errors.Add(Errors.Location.InvalidLongitude);
    }

    if (request.Latitude is < Location.MinLatitudeValue or > Location.MaxLatitudeValue)
    {
      errors.Add(Errors.Location.InvalidLatitude);
    }

    return errors;
  }

  private static ErrorOr<Location> MapUpdatedLocation(Location location, UpdateLocationDto request)
  {
    List<Error> errors = new();

    if (request.Title.Length is < Location.MinTitleLength or > Location.MaxTitleLength)
    {
      errors.Add(Errors.Location.InvalidTitle);
    }

    if (request.Description.Length is < Location.MinDescriptionLength or > Location.MaxDescriptionLength)
    {
      errors.Add(Errors.Location.InvalidDescription);
    }

    if (request.Longitude is > 0 && request.Longitude is < Location.MinLongitudeValue or > Location.MaxLongitudeValue)
    {
      errors.Add(Errors.Location.InvalidLongitude);
    }

    if (request.Latitude is > 0 && request.Latitude is < Location.MinLatitudeValue or > Location.MaxLatitudeValue)
    {
      errors.Add(Errors.Location.InvalidLatitude);
    }

    if (errors.Count > 0)
    {
      return errors;
    }

    location.Title = string.IsNullOrEmpty(request.Title) ? location.Title : request.Title;
    location.Description = string.IsNullOrEmpty(request.Description) ? location.Description : request.Description;
    location.Status = string.IsNullOrEmpty(request.Status) ? location.Status : request.Status;

    location.Longitude = request.Longitude is not > 0 ? location.Longitude : request.Longitude;
    location.Latitude = request.Latitude is not > 0 ? location.Latitude : request.Latitude;

    return location;
  }

  private static LocationResponseDto MapToLocationResponse(Location location)
  {
    var geometry = new LocationGeometryDto
    {
      Coordinates = new[] { location.Longitude, location.Latitude }
    };

    var properties = new LocationPropertiesDto
    {
      Title = location.Title,
      Description = location.Description,
      Image = location.Image.Replace(AzureProvider.AzureBlobStorageServer, AzureProvider.AzureCDNserver),
      Rating = location.Rating,
      Category = location.Categories,
      Status = location.Status
    };

    return new LocationResponseDto { Id = location.Id, Geometry = geometry, Properties = properties };
  }
}