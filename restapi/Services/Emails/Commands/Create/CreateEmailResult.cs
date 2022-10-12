namespace restapi.Services.Emails.Commands.Create;

public record CreateEmailResult(
  Guid Id,
  string Address,
  string Token
);