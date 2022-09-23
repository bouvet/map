using Azure;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Services.Settings;

namespace restapi.Common.Services.Providers;

public class AzureProvider : IAzureProvider
{
  public SecretClient GetKeyVaultClient()
  {
    var azureKeyVaultUri = Environment.GetEnvironmentVariable("KeyVaultUri");

    var keyVaultEndpoint = new Uri(azureKeyVaultUri!);

    return new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());
  }

  public async Task<CloudBlobContainer> GetImageBlobContainer(SecretClient client)
  {
    Response<KeyVaultSecret> blobStorageConnectionString = await GetKeyVaultSecret(client, AzureSettings.KeyVaultNameForBlobStorageConnectionString);

    CloudStorageAccount azureCloudStorageAccount = CloudStorageAccount.Parse(blobStorageConnectionString.Value.Value);
    CloudBlobClient blobStorageClient = azureCloudStorageAccount.CreateCloudBlobClient();
    CloudBlobContainer imageBlobContainer = blobStorageClient.GetContainerReference("images");
    await imageBlobContainer.CreateIfNotExistsAsync();
    return imageBlobContainer;
  }

  public async Task<Response<KeyVaultSecret>> GetKeyVaultSecret(SecretClient client, string? keyVaultSecretName)
  {
    return await client.GetSecretAsync(keyVaultSecretName);
  }
}