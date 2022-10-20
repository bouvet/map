using restapi.Entities;

namespace restapi.Services.Authentication.Commands.AuthWithCode;

public record AuthWithCodeResult(
  User? User,
  Guid? EmailId,
  string Token,
  bool IsLoggingIn,
  bool IsRegistering,
  bool EmailIsVerified
);