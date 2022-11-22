using System.Net;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Providers.Authorization;
using restapi.Common.Services.Mappers.Sessions;
using restapi.Contracts.Sessions;
using restapi.Services.Sessions.Commands.Create;
using restapi.Services.Sessions.Common;

namespace restapi.Controllers;

[Authorize(Roles = "User")]
public class SessionsController : ApiController
{
    private readonly ISender mediator;

    private readonly ISessionMapper sessionMapper;

    private readonly IAuthorizationProvider authorizationProvider;

    public SessionsController(ISender mediator, ISessionMapper sessionMapper)
    {
        this.mediator = mediator;
        this.sessionMapper = sessionMapper;
        this.authorizationProvider = authorizationProvider;
    }

    [HttpPost]
    public async Task<IActionResult> CreateSession(CreateSessionRequest request)
    {
        var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, null);
        Console.WriteLine(authResult.UserId);
        var createSessionCommand = sessionMapper.MapCreateRequestToCommand(request);

        // if (authResult.UserId != userId)
        // {
        //     return Forbid();
        // }
        // var createSessionCommand = new CreateSessionCommand(request.LocationID, request.Registered, request.UserId);
        ErrorOr<SessionResult> createSessionResult = await mediator.Send(createSessionCommand);
        return createSessionResult.Match(
            result => CreatedAtGetSession(result),
            errors => Problem(errors)
        );
    }
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetSessionById(Guid id)
    {
        var getSessionByIdQuery = sessionMapper.MapGetByIdQueryToCommand(id);

        ErrorOr<SessionResult> getSessionByIdQueryResult = await mediator.Send(getSessionByIdQuery);

        return getSessionByIdQueryResult.Match(
        result => Ok(sessionMapper.MapResultToResponse(result)),
        errors => Problem(errors)

        );
    }
    private CreatedAtActionResult CreatedAtGetSession(SessionResult result)
    {
        return CreatedAtAction(
            actionName: nameof(GetSessionById),
            routeValues: new { id = result.Session.Id },
            value: sessionMapper.MapResultToResponse(result)
          );
    }
}
