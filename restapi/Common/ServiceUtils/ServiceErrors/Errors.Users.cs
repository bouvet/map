using ErrorOr;

namespace restapi.Common.ServiceUtils.ServiceErrors;

public static partial class Errors
{
  public static class User
  {
    //TODO: Create password validator for stronger passwords

    public static Error AlreadyExists => Error.Conflict(
      code: "User.AlreadyExists",
      description: "User already exists"
    );

    public static Error RoleAlreadyAdded => Error.Conflict(
      code: "User.RoleAlreadyAdded",
      description: "Role is already added to user!"
    );

    public static Error InvalidPassword => Error.Validation(
      code: "User.InvalidPassword",
      description: $"Password must be at least {Entities.User.MinPasswordLength} characters long"
    );

    public static Error PasswordsDoesNotMatch => Error.Validation(
      code: "User.PasswordsDoesNotMatch",
      description: "Passwords must match"
    );

    public static Error InvalidEmail => Error.Validation(
      code: "User.InvalidEmail",
      description: "Given email is invalid."
    );

    public static Error NotFound => Error.NotFound(
      code: "User.NotFound",
      description: "User with given id or email was not found."
    );
  }
}