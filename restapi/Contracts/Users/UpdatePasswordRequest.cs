namespace restapi.Contracts.Users;

public record UpdatePasswordRequest(
  string? CurrentPassword,
  string Password,
  string ConfirmPassword
);