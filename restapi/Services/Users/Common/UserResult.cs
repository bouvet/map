using restapi.Models;

namespace restapi.Services.Users.Common;

public record UserResult(
  Guid Id,
  string Email,
  string? FirstName,
  string? LastName,
  string? Address,
  string? PostalArea,
  int? PostalCode,
  int? PhoneNumber,
  DateTime? DOB,
  List<Role>? Roles
);