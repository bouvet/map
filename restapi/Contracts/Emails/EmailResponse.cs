namespace restapi.Contracts.Emails;

public record EmailResponse(
  Guid Id,
  string Address,
  int ConfirmationCode,
  bool Confirmed,
  DateTime Created,
  DateTime? Updated
);