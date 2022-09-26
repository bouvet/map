namespace restapi.Common.Services.Settings;

public class AzureSettings
{
  public const string SectionName = "AzureSettings";
  public const string KeyVaultUriName = "KeyVaultUri";
  public const string KeyVaultNameForDbConnectionString = "DbConnectionString";
  public const string KeyVaultNameForBlobStorageConnectionString = "azureBlobStorageConnectionString";
  public const string KeyVaultNameForJwtSecret = "JwtSecret";
  public const string KeyVaultNameForJwtIssuer = "JwtIssuer";
  public const string KeyVaultNameForJwtAudience = "JwtAudience";
  public const string KeyVaultNameForJwtExpiryMinutes = "JwtExpiryMinutes";
  public const string AzureBlobStorageServer = ".blob.core.windows.net";
  public const string AzureCDNserver = ".azureedge.net";

  public string KeyVaultUri { get; init; } = null!;
}