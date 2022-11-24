using System.Runtime.Serialization;
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
using restapi.Data;
using restapi.Entities;
using Microsoft.EntityFrameworkCore;

namespace restapi.Controllers;

// [Authorize(Roles = "User")]
public class SessionsController : ApiController
{
    private readonly ISender mediator;

    private readonly ISessionMapper sessionMapper;

    private readonly IAuthorizationProvider authorizationProvider;

    private readonly DataContext dataContext;
    public SessionsController(ISender mediator, ISessionMapper sessionMapper, IAuthorizationProvider authorizationProvider, DataContext dataContext)
    {
        this.mediator = mediator;
        this.sessionMapper = sessionMapper;
        this.authorizationProvider = authorizationProvider;
        this.dataContext = dataContext;
    }

    [HttpPost]
    public async Task<IActionResult> CreateSession(CreateSessionRequest request)
    {
        var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, null);
        Console.WriteLine(authResult.UserId);
        var createSessionCommand = sessionMapper.MapCreateRequestToCommand(request, authResult.UserId);


        // var createSessionCommand = new CreateSessionCommand(request.LocationID, request.Registered, authResult.UserId);
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

    [HttpGet]
    public async Task<IActionResult> GetSessions(Guid locationId)
    {
        // var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, LocationId);
        var getSessionsQuery = sessionMapper.MapGetSessionsToCommand(locationId);
        // locationId er {00000000-0000-0000-0000-000000000000}

        // var session = await dataContext.Sessions.Include(session => session.User).SingleOrDefaultAsync(session => session.Id == LocationId);
        // session er null
        // if (session?.User?.Id != authResult.UserId && session?.Location?.Id != LocationId)
        // {
        //     return Forbid();
        // }

        ErrorOr<List<SessionResult>> getSessionsResult = await mediator.Send(getSessionsQuery);

        return getSessionsResult.Match(
            result => Ok(result),
            errors => Problem(errors)
        );
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteSession(Guid id)
    {
        var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, id);
        var session = await dataContext.Sessions.Include(session => session.User).SingleOrDefaultAsync(session => session.Id == id);

        if (session?.User?.Id != authResult.UserId)
        {
            return Forbid();
        }

        var deleteSessionCommand = sessionMapper.MapDeleteToCommand(session!);

        ErrorOr<Deleted> deleteSessionResult = await mediator.Send(deleteSessionCommand);

        return deleteSessionResult.Match(
            _ => NoContent(),
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
