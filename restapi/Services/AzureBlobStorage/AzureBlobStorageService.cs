using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using ErrorOr;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common;
using SkiaSharp;

namespace restapi.Services.AzureBlobStorage;

public class AzureBlobStorageService : IAzureBlobStorageService
{
  private readonly AzureSettings _azureSettings;

  public AzureBlobStorageService(IOptions<AzureSettings> azureOptions)
  {
    _azureSettings = azureOptions.Value;
  }

  public async Task<ErrorOr<CloudBlockBlob>> UploadFile(IFormFile image)
  {
    SKData webpImage = await ConvertImageToWebp(image, AzureSettings.CompressedImageQuality);

    SecretClient client = GetKeyVaultClient();

    CloudBlobContainer imageBlobContainer = await GetImageBlobContainer(client);

    CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference(Guid.NewGuid().ToString());

    blockBlob.Properties.ContentType = AzureSettings.ImageContentType;

    await blockBlob.UploadFromStreamAsync(webpImage.AsStream());

    return blockBlob;
  }

  private async Task<CloudBlobContainer> GetImageBlobContainer(SecretClient client)
  {
    var blobStorageConnection = await client.GetSecretAsync(_azureSettings.KeyVaultBlobStorageConnectionString);
    CloudStorageAccount azureCloudStorageAccount = CloudStorageAccount.Parse(blobStorageConnection.Value.Value);
    CloudBlobClient blobStorageClient = azureCloudStorageAccount.CreateCloudBlobClient();
    CloudBlobContainer imageBlobContainer = blobStorageClient.GetContainerReference("images");
    await imageBlobContainer.CreateIfNotExistsAsync();
    return imageBlobContainer;
  }

  private static async Task<SKData> ConvertImageToWebp(IFormFile uploadFile, int compressedImageQuality)
  {
    var streamFromUpload = new MemoryStream();
    await uploadFile.CopyToAsync(streamFromUpload);
    var uploadData = SKData.CreateCopy(streamFromUpload.GetBuffer());
    return SKImage.FromEncodedData(uploadData).Encode(SKEncodedImageFormat.Webp, compressedImageQuality);
  }

  private SecretClient GetKeyVaultClient()
  {
    var keyVaultEndpoint = new Uri(_azureSettings.KeyVaultUri);
    return new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());
  }
}