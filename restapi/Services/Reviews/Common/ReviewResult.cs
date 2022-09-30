namespace restapi.Services.Reviews.Common;

public record ReviewResult(
  Guid Id,
  string Status,
  string? Text,
  string? Image,
  DateTime Created,
  DateTime? Updated,
  Guid LocationId
);