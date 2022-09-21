using ErrorOr;

namespace restapi.ServiceErrors;

public static partial class Errors
{
  public static class User
  {
    public static Error NotFound => Error.NotFound(
      code: "User.NotFound",
      description: "User with given id was not found, please try again"
    );
  }
}