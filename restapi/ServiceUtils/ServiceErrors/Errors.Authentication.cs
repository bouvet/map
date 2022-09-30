using ErrorOr;

namespace restapi.ServiceUtils.ServiceErrors;

public static partial class Errors
{
  public static class Authentication
  {
    public static Error InvalidCredentials => Error.Validation(
     code: "Authentication.InvalidCredentials",
     description: "Invalid Credentials"
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