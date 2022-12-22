using ErrorOr;
using MediatR;
using restapi.Data;

namespace restapi.Services.Sessions.Commands.Delete;

public class DeleteSessionCommandHandler : IRequestHandler<DeleteSessionCommand, ErrorOr<Deleted>>
{
  private readonly DataContext dataContext;

  public DeleteSessionCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteSessionCommand request, CancellationToken cancellationToken)
  {
    if (request.Session == null)
    {
      return Errors.Session.NotFound;
    }

    dataContext.Sessions.Remove(request.Session);
    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Deleted;
  }
}