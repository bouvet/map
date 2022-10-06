using restapi.Contracts.Users;
namespace restapi.Contracts.Reviews;

public record ReviewResponse(
  Guid Id,
  string Status,
  string? Text,
  string? Image,
  DateTime Created,
  DateTime? Updated,
  CreatorEditorResponse? Creator,
  CreatorEditorResponse? Editor,
  Guid LocationId
);