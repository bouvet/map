namespace restapi.Common.Services.Jwt;

public interface IJwtGenerator
{
  string GenerateToken(Guid userId, string email);
}