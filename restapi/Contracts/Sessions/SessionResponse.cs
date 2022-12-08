namespace restapi.Contracts.Sessions;

public record SessionResponse(
    Guid Id,
    DateTime Registered,
    string LocationTitle,
    Guid LocationId,
    Guid UserId
);