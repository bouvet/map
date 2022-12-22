using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Entities;
using restapi.Services.Sessions.Common;

namespace restapi.Services.Sessions.Commands.Create;

public class CreateSessionCommandHandler : IRequestHandler<CreateSessionCommand, ErrorOr<SessionResult>>
{
  private readonly DataContext dataContext;

  public CreateSessionCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<SessionResult>> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
  {
    var location = await dataContext.Locations.FindAsync(new object?[] { request.LocationId }, cancellationToken: cancellationToken);

    if (location is null)
    {
      return Errors.Location.NotFound;
    }

    var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    var session = new Session
    {
      Id = Guid.NewGuid(),
      Location = location,
      User = user,
      Registered = request.Registered
    };
    // adds Session items to the database
    dataContext.Sessions.Add(session);
    await dataContext.SaveChangesAsync(cancellationToken);
    return new SessionResult(session);
  }
}