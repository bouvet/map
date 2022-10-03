using ErrorOr;

<<<<<<<< HEAD:restapi/Common/ServiceUtils/ServiceErrors/Errors.Reviews.cs
namespace restapi.Common.ServiceUtils.ServiceErrors;
========
namespace restapi.ServiceUtils.ServiceErrors;
>>>>>>>> c3bab50c635a2f21b1396738001752828fde266e:restapi/ServiceUtils/ServiceErrors/Errors.Reviews.cs

public static partial class Errors
{
  public static class Review
  {
    public static Error InvalidId => Error.Validation(
     code: "Review.InvalidId",
     description: "Provided ID is invalid."
   );

    public static Error InvalidRating => Error.Validation(
     code: "Review.InvalidRating",
     description: $"Review Rating must be between {Models.Review.MinRatingValue} and {Models.Review.MaxRatingValue}"
   );

    public static Error LocationNotFound => Error.NotFound(
      code: "Review.LocationNotFound",
      description: "Location with provided locationId was not found."
    );

    public static Error NotFound => Error.NotFound(
      code: "Review.NotFound",
      description: "Review was not found."
    );
  }
}