using Azure;
using Azure.Security.KeyVault.Secrets;
using Microsoft.WindowsAzure.Storage.Blob;

namespace restapi.Common.Services.Providers;

public interface IAzureProvider
{
  SecretClient GetKeyVaultClient();
  Task<CloudBlobContainer> GetImageBlobContainer(SecretClient client);
  Task<Response<KeyVaultSecret>> GetKeyVaultSecret(SecretClient client, string? keyVaultSecretName);
}