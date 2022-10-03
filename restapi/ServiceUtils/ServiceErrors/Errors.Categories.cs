using ErrorOr;

<<<<<<<< HEAD:restapi/Common/ServiceUtils/ServiceErrors/Errors.Categories.cs
namespace restapi.Common.ServiceUtils.ServiceErrors;
========
namespace restapi.ServiceUtils.ServiceErrors;
>>>>>>>> c3bab50c635a2f21b1396738001752828fde266e:restapi/ServiceUtils/ServiceErrors/Errors.Categories.cs

public static partial class Errors
{
  public static class Category
  {
    public static Error AlreadyExists => Error.Conflict(
      code: "Category.AlreadyExists",
      description: "Category with that name already exists"
    );

    public static Error UsedByLocations => Error.Conflict(
     code: "Category.UsedByLocations",
     description: "Category is being used by locations, can not delete at this time"
   );

    public static Error InvalidName => Error.Validation(
     code: "Category.InvalidName",
     description: $"Category Name must be between {Models.Category.MinNameLength} and {Models.Category.MaxNameLength} characters"
   );

    public static Error InvalidEmoji => Error.Validation(
      code: "Category.InvalidEmoji",
      description: "Category Emoji can not be empty"
    );

    public static Error NotFound => Error.NotFound(
      code: "Category.NotFound",
      description: "Category with given id was not found."
    );
  }

}