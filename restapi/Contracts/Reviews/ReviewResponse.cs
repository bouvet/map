using restapi.Contracts.Users;
namespace restapi.Contracts.Reviews;

public record ReviewResponse(
  Guid Id,
  string Status,
  string? Text,
  string? Image,
  DateTime Created,
  DateTime? Updated,
  UserResponse? Creator,
  UserResponse? Editor,
  Guid LocationId
);