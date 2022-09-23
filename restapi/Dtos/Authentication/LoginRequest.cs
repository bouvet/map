namespace restapi.Dtos.Authentication;

public record LoginRequest(
  string Email,
  string Password
);