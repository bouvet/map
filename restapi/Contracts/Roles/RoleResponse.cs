using restapi.Contracts.Users;

namespace restapi.Contracts.Roles;

public record RoleResponse(
  Guid Id,
  string Name,
  DateTime Created,
  DateTime? Updated,
  CreatorEditorResponse? Creator,
  CreatorEditorResponse? Editor
);