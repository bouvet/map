using restapi.Models;

namespace restapi.Services.Roles.Common;

public record RoleResponse(
  Guid Id,
  string Name,
  DateTime Created,
  DateTime? Updated,
  List<User>? Users
);