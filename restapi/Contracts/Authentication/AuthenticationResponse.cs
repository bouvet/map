using restapi.Contracts.Categories;
using restapi.Contracts.Roles;

namespace restapi.Contracts.Authentication;

public record AuthenticationResponse(
  Guid Id,
  string Email,
  string? FirstName,
  string? LastName,
  string? Address,
  string? PostalArea,
  int PostalCode,
  int PhoneNumber,
  DateTime? DOB,
  List<RoleResponse> Roles,
  List<CategoryResponse> FavoriteCategories,
  string Token
);