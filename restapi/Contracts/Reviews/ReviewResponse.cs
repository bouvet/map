using restapi.Contracts.Users;
using restapi.Models;

namespace restapi.Contracts.Reviews;

public record ReviewResponse(
  Guid Id,
  string Status,
  string? Text,
  Image? Image,
  DateTime Created,
  DateTime? Updated,
  CreatorEditorResponse? Creator,
  CreatorEditorResponse? Editor,
  Guid LocationId
);