namespace restapi.Common.Providers;

public class PasswordProvider : IPasswordProvider
{
  public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);
  public bool VerifyPassword(string password, string hashedPassword) => BCrypt.Net.BCrypt.Verify(password, hashedPassword);
}
