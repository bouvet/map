using restapi.Models;

namespace restapi.Contracts.Users;

public record UserResponse(
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