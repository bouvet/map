using restapi.Contracts.Categories;
using restapi.Contracts.Roles;

namespace restapi.Contracts.Authentication;

public record AuthenticateWithCodeResponse(
  Guid? Id,
  Guid? EmailId,
  string? Email,
  string? FirstName,
  string? LastName,
  string? Address,
  string? AuthenticationMethod,
  string? PostalArea,
  int? PostalCode,
  int? PhoneNumber,
  DateTime? DOB,
  DateTime? Registered,
  DateTime? Updated,
  List<RoleResponse>? Roles,
  List<CategoryResponse>? FavoriteCategories,
  bool IsLoggingIn,
  bool IsRegistering,
  bool EmailIsVerified,
  string Token
);