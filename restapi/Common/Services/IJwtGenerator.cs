using restapi.Models;

namespace restapi.Common.Services;

public interface IJwtGenerator
{
  string GenerateToken(User user);
}