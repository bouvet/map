namespace restapi.Contracts.Users;

public record UpdateUserRequest(
  string? FirstName,
  string? LastName,
  string? Address,
  string? PostalArea,
  int PostalCode,
  int PhoneNumber,
  bool? DeleteProfileImage,
  DateTime? DOB,
  List<Guid>? FavoriteCategoryIds,
  IFormFile? ProfileImage
);