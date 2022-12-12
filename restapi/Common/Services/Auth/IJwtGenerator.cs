using restapi.Entities;

namespace restapi.Common.Services.Auth;

public interface IJwtGenerator
{
  string GenerateUserToken(User user);
  string GenerateRegistrationToken(Email email);
  string GenerateResetPasswordToken(User user);
  string GenerateChangeEmailToken(User user, string email);
}