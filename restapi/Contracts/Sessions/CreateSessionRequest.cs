namespace restapi.Contracts.Sessions;

public record CreateSessionRequest(
    Guid LocationID,
    DateTime Registered,
    Guid UserId
);