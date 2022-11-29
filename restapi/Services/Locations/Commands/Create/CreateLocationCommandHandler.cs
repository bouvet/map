using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Entities;
using restapi.Services.ImageStorages.Commands.Upload;
using restapi.Services.ImageStorages.Common;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Commands.Create;

public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommand, ErrorOr<LocationResult>>
{
  private readonly DataContext dataContext;
  private readonly ISender mediator;

  public CreateLocationCommandHandler(DataContext dataContext, ISender mediator)
  {
    this.dataContext = dataContext;
    this.mediator = mediator;
  }

  public async Task<ErrorOr<LocationResult>> Handle(CreateLocationCommand request, CancellationToken cancellationToken)
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
        var category = await dataContext.Categories.FindAsync(new object?[] { categoryId }, cancellationToken: cancellationToken);

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

    if (request.UserId is not null)
    {
      var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

      if (user is not null)
      {
        location.Creator = user;
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

    dataContext.Locations.Add(location);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new LocationResult(location);
  }

  private static List<Error> ValidateUserInput(CreateLocationCommand request)
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

    return errors;
  }
}