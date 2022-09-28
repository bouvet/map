using restapi.Models;

namespace restapi.Common.Services.Jwt;

public interface IJwtGenerator
{
  string GenerateToken(User user);
}