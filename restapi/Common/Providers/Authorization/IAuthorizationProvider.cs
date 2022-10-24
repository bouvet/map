using System.Security.Claims;
namespace restapi.Common.Providers.Authorization;

public interface IAuthorizationProvider
{
  AuthorizationProviderResult CheckAuthorization(ClaimsPrincipal userContext, Guid? requestId);
}