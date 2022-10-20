namespace restapi.Services.Authentication.Commands.AuthWithCode;

public class GoogleAuthResponse
{
  public string Access_token { get; set; } = null!;
  public int Expires_in { get; set; }
  public string Refresh_token { get; set; } = null!;
  public string Scope { get; set; } = null!;
  public string Token_type { get; set; } = null!;
  public string Id_token { get; set; } = null!;
}