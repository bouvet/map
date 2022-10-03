using restapi.Contracts.Users;
using restapi.Models;

namespace restapi.Contracts.Roles;

public record RoleResponse(
  Guid Id,
  string Name,
  DateTime Created,
  DateTime? Updated,
  UserResponse? Creator,
  UserResponse? Editor,
  List<User>? Users
);