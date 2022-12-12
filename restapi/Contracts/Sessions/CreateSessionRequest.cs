namespace restapi.Contracts.Sessions;

public record CreateSessionRequest(
    Guid LocationId,
    DateTime Registered,
    Guid UserId
);