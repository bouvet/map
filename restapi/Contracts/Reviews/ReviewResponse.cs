namespace restapi.Contracts.Reviews;

public record ReviewResponse(
  Guid Id,
  string Status,
  string? Text,
  string? Image,
  DateTime Created,
  DateTime? Updated,
  Guid LocationId
);