using Azure;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace restapi.Common.Providers;

public class AzureProvider
{
  public const string SectionName = "AzureProvider";
  public const string KeyVaultUriName = "KeyVaultUri";
  public const string KeyVaultNameForDbConnectionString = "DbConnectionString";
  public const string KeyVaultNameForBlobStorageConnectionString = "azureBlobStorageConnectionString";
  public string BlobStorageContainerName { get; set; } = "images";
  public const string AzureBlobStorageServer = ".blob.core.windows.net";
  public const string AzureCDNserver = ".azureedge.net";

  public string KeyVaultUri { get; set; } = null!;
  public string DbConnectionString { get; set; } = null!;
  public string BlobStorageConnectionString { get; set; } = null!;
  public SecretClient? KeyVaultSecretClient { get; set; }

  public SecretClient GetKeyVaultClient()
  {
    if (KeyVaultSecretClient is not null)
    {
      return KeyVaultSecretClient;
    }

    var keyVaultEndpoint = new Uri(KeyVaultUri);

    return new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());
  }

  public async Task<CloudBlobContainer> GetImageBlobContainer(SecretClient client)
  {
    if (string.IsNullOrEmpty(BlobStorageConnectionString))
    {
      Response<KeyVaultSecret> keyVaultResponse = await GetKeyVaultSecret(client, KeyVaultNameForBlobStorageConnectionString);
      BlobStorageConnectionString = keyVaultResponse.Value.Value;
    }

    CloudStorageAccount azureCloudStorageAccount = CloudStorageAccount.Parse(BlobStorageConnectionString);
    CloudBlobClient blobStorageClient = azureCloudStorageAccount.CreateCloudBlobClient();
    CloudBlobContainer imageBlobContainer = blobStorageClient.GetContainerReference(BlobStorageContainerName);
    await imageBlobContainer.CreateIfNotExistsAsync();
    return imageBlobContainer;
  }

  public async Task<Response<KeyVaultSecret>> GetKeyVaultSecret(SecretClient client, string? keyVaultSecretName)
  {
    return await client.GetSecretAsync(keyVaultSecretName);
  }
}