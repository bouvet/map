using restapi.Contracts.Users;

namespace restapi.Contracts.Categories;

public record CategoryResponse(
  Guid Id,
  string Name,
  string Emoji,
  DateTime Created,
  DateTime? Updated,
  MinifiedUserResponse? Creator,
  MinifiedUserResponse? Editor
);