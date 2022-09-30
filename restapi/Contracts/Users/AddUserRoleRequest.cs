namespace restapi.Contracts.Users;

public record AddUserRoleRequest(
  Guid UserId,
  Guid RoleId
);