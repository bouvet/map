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
  public const string AzureBlobStorageServer = ".blob.core.windows.net";
  public const string AzureCDNserver = ".azureedge.net";

  public string BlobStorageContainerName { get; set; } = "images";
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

  public async Task<Response<KeyVaultSecret>> GetKeyVaultSecret(string keyVaultSecretName, CancellationToken cancellationToken = default)
  {
    var client = GetKeyVaultClient();

    return await client.GetSecretAsync(keyVaultSecretName, cancellationToken: cancellationToken);
  }

  public async Task<CloudBlobContainer> GetImageBlobContainer(CancellationToken cancellationToken)
  {
    if (string.IsNullOrEmpty(BlobStorageConnectionString))
    {
      Response<KeyVaultSecret> keyVaultResponse = await GetKeyVaultSecret(KeyVaultNameForBlobStorageConnectionString, cancellationToken);
      BlobStorageConnectionString = keyVaultResponse.Value.Value;
    }

    CloudStorageAccount azureCloudStorageAccount = CloudStorageAccount.Parse(BlobStorageConnectionString);
    CloudBlobClient blobStorageClient = azureCloudStorageAccount.CreateCloudBlobClient();
    CloudBlobContainer imageBlobContainer = blobStorageClient.GetContainerReference(BlobStorageContainerName);
    await imageBlobContainer.CreateIfNotExistsAsync();
    return imageBlobContainer;
  }

  public Uri GetCdnUri(Uri blockBlobUri)
  {
    return new Uri(blockBlobUri.ToString().Replace(AzureBlobStorageServer, AzureCDNserver));
  }
}