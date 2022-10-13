using ErrorOr;

namespace restapi.Common.ServiceUtils.ServiceErrors;

public static partial class Errors
{
  public static class Azure
  {
    public static Error KeyVaultSecretNotFound => Error.Unexpected(
      code: "Azure.KeyVaultSecretNotFound",
      description: "There was a issue getting KeyVault Secret, please try again"
    );
  }
}