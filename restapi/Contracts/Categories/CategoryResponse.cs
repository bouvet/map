using restapi.Contracts.Users;

namespace restapi.Contracts.Categories;

public record CategoryResponse(
  Guid Id,
  string Name,
  string Emoji,
  CreatorEditorResponse? Creator,
  CreatorEditorResponse? Editor
);