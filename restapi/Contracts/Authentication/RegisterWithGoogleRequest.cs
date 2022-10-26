namespace restapi.Contracts.Authentication;

public record RegisterWithGoogleRequest(
  string Email,
  string FirstName,
  string LastName,
  DateTime DOB,
  List<Guid>? FavoriteCategoryIds
);