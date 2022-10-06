using Azure.Security.KeyVault.Secrets;
using ErrorOr;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Providers;
using SkiaSharp;

namespace restapi.Common.Services.Storage;

public class AzureBlobStorage : IAzureBlobStorage
{
  private readonly AzureProvider azureProvider;
  private readonly IImageProvider imageProvider;

  public AzureBlobStorage(IOptions<AzureProvider> azureOptions, IImageProvider imageProvider)
  {
    azureProvider = azureOptions.Value;
    this.imageProvider = imageProvider;
  }

  public async Task<ErrorOr<CloudBlockBlob>> UploadFile(IFormFile file)
  {
    SKData webpImage = await imageProvider.ConvertImageToWebp(file);

    if (webpImage is null)
    {
      return Errors.ImageProvider.ConvertionFail;
    }

    CloudBlobContainer imageBlobContainer = await azureProvider.GetImageBlobContainer();

    CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference(Guid.NewGuid().ToString());

    blockBlob.Properties.ContentType = ImageProvider.ImageContentType;

    await blockBlob.UploadFromStreamAsync(webpImage.AsStream());

    return blockBlob;
  }

  public async Task<ErrorOr<Deleted>> DeleteFile(Guid id)
  {
    CloudBlobContainer imageBlobContainer = await azureProvider.GetImageBlobContainer();

    CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference(id.ToString());

    var wasDeleted = await blockBlob.DeleteIfExistsAsync();

    if (!wasDeleted)
    {
      return Errors.ImageStorage.DeleteFailed;
    }

    return Result.Deleted;
  }
}