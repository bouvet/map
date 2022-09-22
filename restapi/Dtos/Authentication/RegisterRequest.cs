namespace restapi.Dtos.Authentication;

public record RegisterRequest(
  string Email,
  string Password
);