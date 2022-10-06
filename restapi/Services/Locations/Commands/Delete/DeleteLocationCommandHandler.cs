using ErrorOr;
using MediatR;
using restapi.Data;

namespace restapi.Services.Locations.Commands.Delete;

public class DeleteLocationCommandHandler : IRequestHandler<DeleteLocationCommand, ErrorOr<Deleted>>
{
  private readonly DataContext dataContext;

  public DeleteLocationCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
  {
    var location = await dataContext.Locations.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (location is null)
    {
      return Errors.Location.NotFound;
    }

    dataContext.Locations.Remove(location);
    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Deleted;
  }
}