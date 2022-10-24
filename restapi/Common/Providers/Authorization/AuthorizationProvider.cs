using System.Security.Claims;

namespace restapi.Common.Providers.Authorization;

public class AuthorizationProvider : IAuthorizationProvider
{
  public AuthorizationProviderResult CheckAuthorization(ClaimsPrincipal userContext, Guid? requestId)
  {
    var isAuthorized = false;

    var userId = userContext.FindFirst("userId")?.Value;
    var isAdmin = userContext.IsInRole("Administrator");

    if (isAdmin)
    {
      isAuthorized = true;
    }

    if (requestId is not null && !string.IsNullOrEmpty(userId) && Guid.Parse(userId) == requestId)
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
