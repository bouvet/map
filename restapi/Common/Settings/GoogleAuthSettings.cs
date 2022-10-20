namespace restapi.Common.Settings;

public class GoogleAuthSettings
{
  public const string SectionName = "GoogleAuthSettings";
  public const string ClientIdKeyVaultName = "GoogleClientId";
  public const string ClientSecretKeyVaultName = "GoogleClientSecret";
  public const string RedirectUriKeyVaultName = "GoogleRedirectUri";
  public const string AuthUri = "https://oauth2.googleapis.com/token";
  public const string UserInfoUri = "https://www.googleapis.com/oauth2/v2/userinfo?alt=json";

  public string ClientId { get; set; } = null!;
  public string ClientSecret { get; set; } = null!;
  public string RedirectUri { get; set; } = null!;
}