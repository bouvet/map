using restapi.Common.Services.Mappers.Categories;
using restapi.Common.Services.Mappers.ImageStorage;
using restapi.Common.Services.Mappers.Users;
using restapi.Contracts.Categories;
using restapi.Contracts.Locations;
using restapi.Entities;
using restapi.Services.Locations.Commands.Create;
using restapi.Services.Locations.Commands.Delete;
using restapi.Services.Locations.Commands.Update;
using restapi.Services.Locations.Common;
using restapi.Services.Locations.Queries.GetLocationById;
using restapi.Services.Locations.Queries.GetLocationByProximity;
using restapi.Services.Locations.Queries.GetLocations;

namespace restapi.Common.Services.Mappers.Locations;

public class LocationMapper : ILocationMapper
{
  private readonly IUserMapper userMapper;
  private readonly ICategoryMapper categoryMapper;
  private readonly IImageStorageMapper imageStorageMapper;

  public LocationMapper(IUserMapper userMapper, ICategoryMapper categoryMapper, IImageStorageMapper imageStorageMapper)
  {
    this.userMapper = userMapper;
    this.categoryMapper = categoryMapper;
    this.imageStorageMapper = imageStorageMapper;
  }

  public CreateLocationCommand MapCreateRequestToCommand(CreateLocationRequest request, string userId)
  {
    return new CreateLocationCommand(
      request.Title,
      request.Description,
      request.Image,
      request.Longitude,
      request.Latitude,
      request.Category,
      string.IsNullOrEmpty(userId) ? null : Guid.Parse(userId)
    );
  }

  public GetLocationByIdQuery MapGetByIdToCommand(Guid id)
  {
    return new GetLocationByIdQuery(id);
  }

  public GetLocationByProximityQuery MapGetByProximityToCommand(double latitude, double longitude, Guid categoryId)
  {
    return new GetLocationByProximityQuery(latitude, longitude, categoryId);
  }

  public List<LocationResponse> MapResultListToResponseList(List<LocationResult> resultList)
  {
    var responseList = new List<LocationResponse>();

    foreach (LocationResult result in resultList)
    {
      responseList.Add(MapResultToResponse(result));
    }

    return responseList;
  }

  public LocationResponse MapResultToResponse(LocationResult result)
  {
    var categoryList = new List<CategoryResponse>();

    if (result.Location.Categories.Count > 0)
    {
      categoryList = categoryMapper.MapDbListToResponseList(result.Location.Categories);
    }

    var geometry = new LocationGeometry(
      new[] { result.Location.Longitude, result.Location.Latitude }
    );

    var properties = new LocationProperties
    (
      result.Location.Title,
      result.Location.Description,
      result.Location.OriginalImage is not null ? imageStorageMapper.MapDbResultToResponse(result.Location.OriginalImage) : null,
      result.Location.WebpImage is not null ? imageStorageMapper.MapDbResultToResponse(result.Location.WebpImage) : null,
      result.Location.Status,
      result.Location.Rating,
      categoryList
    );

    return new LocationResponse(
        result.Location.Id,
        "Feature",
        result.Location.Creator is not null ? userMapper.MapUserToMinifiedUserResponse(result.Location.Creator) : null,
        result.Location.Editor is not null ? userMapper.MapUserToMinifiedUserResponse(result.Location.Editor) : null,
        properties,
        geometry
      );
  }

  public UpdateLocationCommand MapUpdateToCommand(UpdateLocationRequest request, Location? location, Guid? userId)
  {
    return new UpdateLocationCommand(
      request.Id,
      request.Title,
      request.Description,
      request.Image,
      request.Status,
      request.Longitude,
      request.Latitude,
      request.Category,
      location,
      userId
    );
  }
}
