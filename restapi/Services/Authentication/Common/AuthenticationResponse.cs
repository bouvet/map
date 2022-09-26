namespace restapi.Services.Authentication.Common;

public record AuthenticationResponse(
  Guid Id,
  string Email,
  string Name,
  string Address,
  string PostalArea,
  string Token,
  int PostalCode,
  int BirthYear
);