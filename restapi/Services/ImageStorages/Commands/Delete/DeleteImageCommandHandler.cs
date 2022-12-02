using ErrorOr;
using MediatR;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Providers;
using restapi.Data;

namespace restapi.Services.ImageStorages.Commands.Delete;

public class DeleteImageCommandHandler : IRequestHandler<DeleteImageCommand, ErrorOr<Deleted>>
{
  private readonly AzureProvider azureProvider;
  private readonly DataContext dataContext;

  public DeleteImageCommandHandler(IOptions<AzureProvider> azureOptions, DataContext dataContext)
  {
    azureProvider = azureOptions.Value;
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteImageCommand request, CancellationToken cancellationToken)
  {
    CloudBlobContainer imageBlobContainer = await azureProvider.GetImageBlobContainer(cancellationToken);

    CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference($"{request.ImageType}/{request.Id}");

    var wasDeleted = await blockBlob.DeleteIfExistsAsync();

    if (!wasDeleted)
    {
      return Errors.ImageStorage.DeleteFailed;
    }

    var image = await dataContext.Images.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (image?.OriginalImageId is not null)
    {
      CloudBlockBlob originalBlockBlob = imageBlobContainer.GetBlockBlobReference($"originals/{image?.OriginalImageId}");
      var originalWasDeleted = await originalBlockBlob.DeleteIfExistsAsync();

      if (!originalWasDeleted)
      {
        return Errors.ImageStorage.DeleteFailed;
      }
      var originalImage = await dataContext.Images.FindAsync(new object?[] { image?.OriginalImageId }, cancellationToken: cancellationToken);
      if (originalImage is not null)
      {
        dataContext.Images.Remove(originalImage);
      }
    }

    if (image is null)
    {
      return Errors.ImageStorage.DeleteFailed;
    }

    dataContext.Images.Remove(image);
    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Deleted;
  }
}
