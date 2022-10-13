namespace restapi.Contracts.Users;

public record MinifiedUserResponse(
  Guid Id,
  string Email,
  string? FirstName,
  string? LastName,
  DateTime DOB
);