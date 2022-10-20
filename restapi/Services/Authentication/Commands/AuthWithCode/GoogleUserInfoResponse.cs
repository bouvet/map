namespace restapi.Services.Authentication.Commands.AuthWithCode;

public class GoogleUserInfoResponse
{
  public string id { get; set; } = null!;
  public string Email { get; set; } = null!;
  public bool Verified_email { get; set; }
  public string Name { get; set; } = null!;
  public string Given_name { get; set; } = null!;
  public string Family_name { get; set; } = null!;
  public string Picture { get; set; } = null!;
  public string Locale { get; set; } = null!;
}