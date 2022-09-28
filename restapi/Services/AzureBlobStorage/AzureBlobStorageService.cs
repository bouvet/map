using Azure.Security.KeyVault.Secrets;
using ErrorOr;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Services.Providers;
using SkiaSharp;

namespace restapi.Services.AzureBlobStorage;

public class AzureBlobStorageService : IAzureBlobStorageService
{
  private readonly AzureProvider azureProvider;
  private readonly IImageProvider imageProvider;

  public AzureBlobStorageService(IOptions<AzureProvider> azureOptions, IImageProvider imageProvider)
  {
    azureProvider = azureOptions.Value;
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