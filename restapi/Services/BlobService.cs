using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace restapi.Services
{
  static public class BlobService
  {
    static public async Task<CloudBlockBlob> UploadFile(Guid id, IFormFile uploadFile)
    {
      // todo check if valid id for location
      var azureKeyVault = Environment.GetEnvironmentVariable("VaultUri");
      var keyVaultEndpoint = new Uri(azureKeyVault!);
      var client = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());

      string blobFileName = id.ToString();
      var blobstorageconnection = await client.GetSecretAsync("azureBlobStorageConnectionString");

      CloudStorageAccount azureCloudStorageAccount = CloudStorageAccount.Parse(blobstorageconnection.Value.Value);
      CloudBlobClient blobStorageClient = azureCloudStorageAccount.CreateCloudBlobClient();
      CloudBlobContainer imageBlobContainer = blobStorageClient.GetContainerReference("images");
      CloudBlockBlob blockBlob = imageBlobContainer.GetBlockBlobReference(blobFileName);
      blockBlob.Properties.ContentType = uploadFile.ContentType;
      await using (var data = uploadFile.OpenReadStream())
      {
        await blockBlob.UploadFromStreamAsync(data);
      }

      return blockBlob;
    }
  }
}