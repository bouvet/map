using restapi.Models;

namespace restapi.Common.Services.Auth;

public interface IJwtGenerator
{
  string GenerateToken(User user);
}