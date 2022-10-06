namespace restapi.Common.Providers;

public interface IPasswordProvider
{
  string HashPassword(string password);
  bool VerifyPassword(string password, string hashedPassword);
}