namespace restapi.Common.Settings;

public class SendGridSettings
{
  public const string SectionName = "SendGridSettings";
  public const string KeyVaultName = "SendGridApiKey";
  public string ApiKey { get; set; } = null!;
  public string FromEmail { get; set; } = null!;
  public string FromName { get; set; } = null!;
}