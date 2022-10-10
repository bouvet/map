using ErrorOr;
using MediatR;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Providers;

namespace restapi.Services.ImageStorages.Commands.Delete;

public class DeleteImageCommandHandler : IRequestHandler<DeleteImageCommand, ErrorOr<Deleted>>
{
  private readonly AzureProvider azureProvider;

  public DeleteImageCommandHandler(IOptions<AzureProvider> azureOptions)
  {
    azureProvider = azureOptions.Value;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteImageCommand request, CancellationToken cancellationToken)
  {
    CloudBlobContainer imageBlobContainer = await azureProvider.GetImageBlobContainer();

    CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference(request.Id.ToString());

    var wasDeleted = await blockBlob.DeleteIfExistsAsync();

    if (!wasDeleted)
    {
      return Errors.ImageStorage.DeleteFailed;
    }

    return Result.Deleted;
  }
}
