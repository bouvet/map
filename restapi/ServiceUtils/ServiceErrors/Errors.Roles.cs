using ErrorOr;

namespace restapi.ServiceUtils.ServiceErrors;

public static partial class Errors
{
  public static class Role
  {
    public static Error AlreadyExists => Error.Conflict(
      code: "Role.AlreadyExists",
      description: "Role with that name already exists"
    );

    public static Error NotFound => Error.NotFound(
      code: "Role.NotFound",
      description: "Role with given id was not found."
    );
  }

}