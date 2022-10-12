using restapi.Entities;

namespace restapi.Services.Authentication.Common;

public record AuthenticationResult(
  User User,
  string Token
);