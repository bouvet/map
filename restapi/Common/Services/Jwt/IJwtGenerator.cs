namespace restapi.Common.Services.Jwt;

public interface IJwtGenerator
{
  Task<string> GenerateToken(Guid userId, string email);
}