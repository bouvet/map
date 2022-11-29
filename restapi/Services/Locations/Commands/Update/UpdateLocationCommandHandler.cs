using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Entities;
using restapi.Services.ImageStorages.Commands.Delete;
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
    if (request.Location is null)
    {
      return Errors.Location.NotFound;
    }

    ErrorOr<Location> mapUpdatedLocationResult = MapUpdatedLocation(request.Location, request);

    if (mapUpdatedLocationResult.IsError)
    {
      return mapUpdatedLocationResult.Errors;
    }

    if (request.Category?.Count > 0)
    {
      request.Location.Categories = new List<Category>();

      foreach (Guid categoryId in request.Category)
      {
        var category = await dataContext.Categories.FindAsync(new object?[] { categoryId }, cancellationToken: cancellationToken);

        if (category == null)
        {
          return Errors.Category.NotFound;
        }

        request.Location.Categories.Add(category);
      }
    }

    if (request.UserId is not null)
    {
      var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

      if (user is not null)
      {
        request.Location.Editor = user;
      }
    }

    if (request.Image is not null)
    {
      if (request.Location.OriginalImage is not null)
      {
        var deleteImageCommand = new DeleteImageCommand(request.Location.OriginalImage.Id, "originals");

        ErrorOr<Deleted> deleteImageResult = await mediator.Send(deleteImageCommand, cancellationToken);

        if (deleteImageResult.IsError)
        {
          return Errors.ImageStorage.DeleteFailed;
        }
      }

      if (request.Location.WebpImage is not null)
      {
        var deleteImageCommand = new DeleteImageCommand(request.Location.WebpImage.Id, "webp");

        ErrorOr<Deleted> deleteImageResult = await mediator.Send(deleteImageCommand, cancellationToken);

        if (deleteImageResult.IsError)
        {
          return Errors.ImageStorage.DeleteFailed;
        }
      }

      var uploadImageCommand = new UploadImageCommand(
        request.Image,
        request.Location.Editor,
        request.Location.Id,
        null
      );

      ErrorOr<ImageStorageResult> uploadResult = await mediator.Send(uploadImageCommand, cancellationToken);

      if (uploadResult.IsError)
      {
        return Errors.ImageStorage.UploadFailed;
      }

      request.Location.OriginalImage = uploadResult.Value.OriginalImage;
      request.Location.WebpImage = uploadResult.Value.WebpImage;
    }

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Updated;
  }

  private static ErrorOr<Location> MapUpdatedLocation(Location location, UpdateLocationCommand request)
  {
    List<Error> errors = new();

    if (request.Title?.Length is < Location.MinTitleLength or > Location.MaxTitleLength)
    {
      errors.Add(Errors.Location.InvalidTitle);
    }

    if (request.Description?.Length is < Location.MinDescriptionLength or > Location.MaxDescriptionLength)
    {
      errors.Add(Errors.Location.InvalidDescription);
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
