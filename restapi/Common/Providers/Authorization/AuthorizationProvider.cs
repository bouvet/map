using System.Security.Claims;

namespace restapi.Common.Providers.Authorization;

public class AuthorizationProvider : IAuthorizationProvider
{
  public AuthorizationProviderResult CheckAuthorization(ClaimsPrincipal userContext)
  {
    var isAuthorized = false;

    var userId = userContext.FindFirst("userId")?.Value;
    var isAdmin = userContext.IsInRole("Administrator");

    if (!string.IsNullOrEmpty(userId) || isAdmin)
    {
      isAuthorized = true;
    }

    return new AuthorizationProviderResult(
      string.IsNullOrEmpty(userId) ? null : Guid.Parse(userId),
      isAdmin,
      isAuthorized
    );
  }
}
