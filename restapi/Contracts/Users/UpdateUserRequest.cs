namespace restapi.Contracts.Users;

public record UpdateUserRequest(
  string? Email,
  string? FirstName,
  string? LastName,
  string? Address,
  string? PostalArea,
  int PostalCode,
  int PhoneNumber,
  DateTime? DOB
);