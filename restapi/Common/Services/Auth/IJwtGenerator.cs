using restapi.Entities;

namespace restapi.Common.Services.Auth;

public interface IJwtGenerator
{
  string GenerateUserToken(User user);
  string GenerateRegistrationToken(Email email);
}