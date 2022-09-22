namespace restapi.Services.Authentication;

public interface IJwtGenerator
{
  string GenerateToken(Guid userId, string email);
}