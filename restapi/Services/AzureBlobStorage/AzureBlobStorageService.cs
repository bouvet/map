using Azure.Security.KeyVault.Secrets;
using ErrorOr;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Services.Providers;
using restapi.Common.Services.Settings;
using SkiaSharp;

namespace restapi.Services.AzureBlobStorage;

public class AzureBlobStorageService : IAzureBlobStorageService
{
  private readonly IAzureProvider azureProvider;
  private readonly IImageProvider imageProvider;

  public AzureBlobStorageService(IAzureProvider azureProvider, IImageProvider imageProvider)
  {
    this.azureProvider = azureProvider;
    this.imageProvider = imageProvider;
  }

  public async Task<ErrorOr<CloudBlockBlob>> UploadFile(IFormFile image)
  {
    SKData webpImage = await imageProvider.ConvertImageToWebp(image);

    SecretClient client = azureProvider.GetKeyVaultClient();

    CloudBlobContainer imageBlobContainer = await azureProvider.GetImageBlobContainer(client);

    CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference(Guid.NewGuid().ToString());

    blockBlob.Properties.ContentType = ImageProvider.ImageContentType;

    await blockBlob.UploadFromStreamAsync(webpImage.AsStream());

    return blockBlob;
  }
}