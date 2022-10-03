using restapi.Models;

namespace restapi.Services.Authentication.Common;

public record AuthenticationResult(
  User User,
  string Token
);