using ErrorOr;

namespace restapi.Common.ServiceUtils.ServiceErrors;

public static partial class Errors
{
  public static class Authentication
  {
    public static Error InvalidCredentials => Error.Validation(
      code: "Authentication.InvalidCredentials",
      description: "Invalid Credentials"
    );

    public static Error Unauthorized => Error.Custom(
      type: StatusCodes.Status401Unauthorized,
      code: "Authentication.Unauthorized",
      description: "You are not authorized!"
    );

    public static Error Forbidden => Error.Custom(
      type: StatusCodes.Status403Forbidden,
      code: "Authentication.Forbidden",
      description: "You don't have access to this resource!"
    );

    public static Error InvalidEmail => Error.Validation(
       code: "Authentication.InvalidEmail",
       description: "Given email is invalid."
     );

    public static Error NotFound => Error.NotFound(
      code: "Authentication.NotFound",
      description: "User with given id was not found."
    );
  }
}