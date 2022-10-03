namespace restapi.Contracts.Authentication;

public record LoginRequest(
  string Email,
  string Password
);