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
      var streamFromUpload = new MemoryStream();
      await uploadFile.CopyToAsync(streamFromUpload);
      var uploadData = SKData.CreateCopy(streamFromUpload.GetBuffer());
      SKData webpImage = SKImage.FromEncodedData(uploadData).Encode(SKEncodedImageFormat.Webp, 50);

      var azureKeyVault = Environment.GetEnvironmentVariable("VaultUri");
      var keyVaultEndpoint = new Uri(azureKeyVault!);
      var client = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());

      string blobFileName = id.ToString();
      var blobstorageconnection = await client.GetSecretAsync("azureBlobStorageConnectionString");

      CloudStorageAccount azureCloudStorageAccount = CloudStorageAccount.Parse(blobstorageconnection.Value.Value);
      CloudBlobClient blobStorageClient = azureCloudStorageAccount.CreateCloudBlobClient();
      CloudBlobContainer imageBlobContainer = blobStorageClient.GetContainerReference("images");
      await imageBlobContainer.CreateIfNotExistsAsync();
      CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference(blobFileName);

      blockBlob.Properties.ContentType = "image/webp";
      await blockBlob.UploadFromStreamAsync(webpImage.AsStream());

      return blockBlob;
    }
  }
}