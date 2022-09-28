namespace restapi.Services.Authentication.Common;

public record AuthenticationResponse(
  Guid Id,
  string Email,
  string FirstName,
  string LastName,
  string Address,
  string PostalArea,
  int PostalCode,
  int PhoneNumber,
  DateTime? DOB,
  List<string> Roles,
  string Token
);