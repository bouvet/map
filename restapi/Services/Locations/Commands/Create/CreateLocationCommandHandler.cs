using ErrorOr;
using MediatR;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Providers;
using restapi.Common.Services.Storage;
using restapi.Data;
using restapi.Models;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Commands.Create;

public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommand, ErrorOr<LocationResult>>
{
  private readonly DataContext dataContext;
  private readonly IAzureBlobStorage azureBlobStorage;

  public CreateLocationCommandHandler(DataContext dataContext, IAzureBlobStorage azureBlobStorage)
  {
    this.dataContext = dataContext;
    this.azureBlobStorage = azureBlobStorage;
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
      ErrorOr<CloudBlockBlob> fileUploadResult = await azureBlobStorage.UploadFile(request.Image);

      if (fileUploadResult.IsError)
      {
        return Errors.ImageStorage.UploadFailed;
      }

      location.Image = fileUploadResult.Value.Uri.ToString().Replace(AzureProvider.AzureBlobStorageServer, AzureProvider.AzureCDNserver);
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
}