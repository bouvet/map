using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Services.ImageStorages.Commands.Delete;

namespace restapi.Services.Locations.Commands.Delete;

public class DeleteLocationCommandHandler : IRequestHandler<DeleteLocationCommand, ErrorOr<Deleted>>
{
  private readonly DataContext dataContext;
  private readonly ISender mediator;

  public DeleteLocationCommandHandler(DataContext dataContext, ISender mediator)
  {
    this.dataContext = dataContext;
    this.mediator = mediator;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
  {
    if (request.Location is null)
    {
      return Errors.Location.NotFound;
    }

    if (request.Location.Reviews.Count > 0)
    {
      foreach (var review in request.Location.Reviews)
      {
        if (review.WebpImage is not null)
        {
          var deleteImageCommand = new DeleteImageCommand(review.WebpImage.Id, "webp");
          ErrorOr<Deleted> deleteImageResult = await mediator.Send(deleteImageCommand, cancellationToken);
          if (deleteImageResult.IsError)
          {
            return Errors.ImageStorage.DeleteFailed;
          }
        }
      }
    }

    if (request.Location.WebpImage is not null)
    {
      var deleteImageCommand = new DeleteImageCommand(request.Location.WebpImage.Id, "webp");
      ErrorOr<Deleted> deleteImageResult = await mediator.Send(deleteImageCommand, cancellationToken);
      if (deleteImageResult.IsError)
      {
        return Errors.ImageStorage.DeleteFailed;
      }
    }

    dataContext.Locations.Remove(request.Location);
    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Deleted;
  }
}