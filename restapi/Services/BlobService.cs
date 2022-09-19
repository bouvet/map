using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using SkiaSharp;

namespace restapi.Services
{
  static public class BlobService
  {
    static public async Task<CloudBlockBlob> UploadFile(Guid id, IFormFile uploadFile)
    {
      const int compressedImageQuality = 50;

      var streamFromUpload = new MemoryStream();
      await uploadFile.CopyToAsync(streamFromUpload);
      var uploadData = SKData.CreateCopy(streamFromUpload.GetBuffer());
      SKData webpImage = SKImage.FromEncodedData(uploadData).Encode(SKEncodedImageFormat.Webp, compressedImageQuality);

      SecretClient client = GetKeyVaultClient();

      var blobStorageConnection = await client.GetSecretAsync("azureBlobStorageConnectionString");

      CloudStorageAccount azureCloudStorageAccount = CloudStorageAccount.Parse(blobStorageConnection.Value.Value);
      CloudBlobClient blobStorageClient = azureCloudStorageAccount.CreateCloudBlobClient();
      CloudBlobContainer imageBlobContainer = blobStorageClient.GetContainerReference("images");
      await imageBlobContainer.CreateIfNotExistsAsync();
      CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference(id.ToString());

      blockBlob.Properties.ContentType = "image/webp";
      await blockBlob.UploadFromStreamAsync(webpImage.AsStream());

      return blockBlob;
    }

    private static SecretClient GetKeyVaultClient()
    {
      var azureKeyVault = Environment.GetEnvironmentVariable("KeyVaultUri");
      var keyVaultEndpoint = new Uri(azureKeyVault!);
      return new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());
    }
  }
}