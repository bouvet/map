namespace restapi.Contracts.Authentication;

public record RegisterRequest(
  string Email,
  string Password
);