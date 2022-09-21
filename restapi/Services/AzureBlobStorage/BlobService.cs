using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using SkiaSharp;

namespace restapi.Services
{
  static public class BlobService
  {
    static public async Task<CloudBlockBlob> UploadFile(IFormFile image)
    {
      SKData webpImage = await ConvertImageToWebp(image, 50);

      SecretClient client = GetKeyVaultClient();

      CloudBlobContainer imageBlobContainer = await GetImageBlobContainer(client);

      CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference(Guid.NewGuid().ToString());

      blockBlob.Properties.ContentType = "image/webp";

      await blockBlob.UploadFromStreamAsync(webpImage.AsStream());

      return blockBlob;
    }

    private static async Task<CloudBlobContainer> GetImageBlobContainer(SecretClient client)
    {
      var blobStorageConnection = await client.GetSecretAsync("azureBlobStorageConnectionString");
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

    private static SecretClient GetKeyVaultClient()
    {
      var azureKeyVault = Environment.GetEnvironmentVariable("KeyVaultUri");
      var keyVaultEndpoint = new Uri(azureKeyVault!);
      return new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());
    }
  }
}