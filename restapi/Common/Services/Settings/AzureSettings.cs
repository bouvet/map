namespace restapi.Common.Services.Settings;

public class AzureSettings
{
  public const string SectionName = "AzureSettings";
  public const string AzureBlobStorageServer = ".blob.core.windows.net";
  public const string AzureCDNserver = ".azureedge.net";
  public const string ImageContentType = "image/webp";
  public const int CompressedImageQuality = 50;

  public string KeyVaultUri { get; init; } = null!;
  public string KeyVaultJwtSecret { get; init; } = null!;
  public string KeyVaultDbConnectionString { get; init; } = null!;
  public string KeyVaultBlobStorageConnectionString { get; init; } = null!;
}