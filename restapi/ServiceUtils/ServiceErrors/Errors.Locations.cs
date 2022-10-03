using ErrorOr;

<<<<<<<< HEAD:restapi/Common/ServiceUtils/ServiceErrors/Errors.Locations.cs
namespace restapi.Common.ServiceUtils.ServiceErrors;
========
namespace restapi.ServiceUtils.ServiceErrors;
>>>>>>>> c3bab50c635a2f21b1396738001752828fde266e:restapi/ServiceUtils/ServiceErrors/Errors.Locations.cs

public static partial class Errors
{
  public static class Location
  {
    public static Error InvalidTitle => Error.Validation(
      code: "Location.InvalidTitle",
      description: $"Location Title must be between {Models.Location.MinTitleLength} and {Models.Location.MaxTitleLength} characters long"
    );

    public static Error InvalidDescription => Error.Validation(
      code: "Location.InvalidDescription",
      description: $"Location Description must be between {Models.Location.MinDescriptionLength} and {Models.Location.MaxDescriptionLength} characters long"
    );

    public static Error InvalidLongitude => Error.Validation(
      code: "Location.InvalidLongitude",
      description: $"Location Longitude must be between {Models.Location.MinLongitudeValue} and {Models.Location.MaxLongitudeValue}"
    );

    public static Error InvalidLatitude => Error.Validation(
      code: "Location.InvalidLatitude",
      description: $"Location Latitude must be between {Models.Location.MinLatitudeValue} and {Models.Location.MaxLatitudeValue}"
    );

    public static Error NotFound => Error.NotFound(
      code: "Location.NotFound",
      description: "Location with given id was not found."
    );
  }

}