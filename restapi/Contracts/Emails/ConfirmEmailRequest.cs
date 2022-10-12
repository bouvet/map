namespace restapi.Contracts.Emails;

public record ConfirmEmailRequest(
  string Email,
  int ConfirmationCode
);