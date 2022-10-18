namespace restapi.Common.Providers.Authorization;

public record AuthorizationProviderResult(
  Guid? UserId,
  bool IsAdmin,
  bool IsAuthorized
);