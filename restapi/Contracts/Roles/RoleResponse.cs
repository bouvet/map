using restapi.Models;

namespace restapi.Contracts.Roles;

public record RoleResponse(
  Guid Id,
  string Name,
  DateTime Created,
  DateTime? Updated,
  List<User>? Users
);