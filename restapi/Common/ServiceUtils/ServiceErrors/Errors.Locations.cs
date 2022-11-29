using ErrorOr;

namespace restapi.Common.ServiceUtils.ServiceErrors;

public static partial class Errors
{
  public static class Location
  {
    public static Error InvalidTitle => Error.Validation(
      code: "Location.InvalidTitle",
      description: $"Location Title must be between {Entities.Location.MinTitleLength} and {Entities.Location.MaxTitleLength} characters long"
    );

    public static Error InvalidDescription => Error.Validation(
      code: "Location.InvalidDescription",
      description: $"Location Description must be between {Entities.Location.MinDescriptionLength} and {Entities.Location.MaxDescriptionLength} characters long"
    );

    public static Error NotFound => Error.NotFound(
      code: "Location.NotFound",
      description: "Location with given id was not found."
    );
  }

}