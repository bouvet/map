namespace restapi.Contracts.Users;

public record CreatorEditorResponse(
  Guid Id,
  string Email,
  string? FirstName,
  string? LastName
);