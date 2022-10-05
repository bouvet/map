namespace restapi.Contracts.Authentication;

public record RegisterRequest(
  string Email,
  string Password,
  string FirstName,
  string LastName,
  DateTime DOB,
  List<Guid>? FavoriteCategoryIds
);