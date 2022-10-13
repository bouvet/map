namespace restapi.Contracts.Users;

public record UpdatePasswordRequest(
  string Password,
  string ConfirmPassword
);