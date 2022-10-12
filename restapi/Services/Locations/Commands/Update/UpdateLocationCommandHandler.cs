using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Entities;
using restapi.Services.ImageStorages.Commands.Upload;
using restapi.Services.ImageStorages.Common;

namespace restapi.Services.Locations.Commands.Update;

public class UpdateLocationCommandHandler : IRequestHandler<UpdateLocationCommand, ErrorOr<Updated>>
{
  private readonly DataContext dataContext;
  private readonly ISender mediator;

  public UpdateLocationCommandHandler(DataContext dataContext, ISender mediator)
  {
    this.dataContext = dataContext;
    this.mediator = mediator;
  }

  public async Task<ErrorOr<Updated>> Handle(UpdateLocationCommand request, CancellationToken cancellationToken)
  {
    var location = await dataContext.Locations.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (location is null)
    {
      return Errors.Location.NotFound;
    }

    ErrorOr<Location> mapUpdatedLocationResult = MapUpdatedLocation(location, request);

    if (mapUpdatedLocationResult.IsError)
    {
      return mapUpdatedLocationResult.Errors;
    }

    location = mapUpdatedLocationResult.Value;

    if (request.Category?.Count > 0)
    {
      location.Categories = new List<Category>();

      foreach (Guid categoryId in request.Category)
      {
        var category = await dataContext.Categories.FindAsync(new object?[] { categoryId }, cancellationToken: cancellationToken);

        if (category == null)
        {
          return Errors.Category.NotFound;
        }

        location.Categories.Add(category);
      }
    }

    if (request.UserId is not null)
    {
      var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

      if (user is not null)
      {
        location.Editor = user;
      }
    }

    if (request.Image is not null)
    {
      var uploadImageCommand = new UploadImageCommand(
        request.Image,
        location.Creator,
        location.Id,
        null
      );

      ErrorOr<ImageStorageResult> uploadResult = await mediator.Send(uploadImageCommand, cancellationToken);

      if (uploadResult.IsError)
      {
        return Errors.ImageStorage.UploadFailed;
      }

      location.OriginalImage = uploadResult.Value.OriginalImage;
      location.WebpImage = uploadResult.Value.WebpImage;
    }

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Updated;
  }

  private static ErrorOr<Location> MapUpdatedLocation(Location location, UpdateLocationCommand request)
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
}
