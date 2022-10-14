using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Entities;
using restapi.Services.ImageStorages.Commands.Delete;

namespace restapi.Services.Reviews.Commands.Delete;

public class DeleteReviewCommandHandler : IRequestHandler<DeleteReviewCommand, ErrorOr<Deleted>>
{
  private readonly DataContext dataContext;
  private readonly ISender mediator;

  public DeleteReviewCommandHandler(DataContext dataContext, ISender mediator)
  {
    this.dataContext = dataContext;
    this.mediator = mediator;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
  {
    if (request.Review == null)
    {
      return Errors.Review.NotFound;
    }

    if (request.Review.OriginalImage is not null)
    {
      var deleteImageCommand = new DeleteImageCommand(request.Review.OriginalImage.Id, "originals");

      ErrorOr<Deleted> deleteImageResult = await mediator.Send(deleteImageCommand, cancellationToken);

      if (deleteImageResult.IsError)
      {
        return Errors.ImageStorage.DeleteFailed;
      }
    }

    if (request.Review.WebpImage is not null)
    {
      var deleteImageCommand = new DeleteImageCommand(request.Review.WebpImage.Id, "webp");

      ErrorOr<Deleted> deleteImageResult = await mediator.Send(deleteImageCommand, cancellationToken);

      if (deleteImageResult.IsError)
      {
        return Errors.ImageStorage.DeleteFailed;
      }
    }

    dataContext.Reviews.Remove(request.Review);
    await UpdateLocationRating(request.Review.LocationId);

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Deleted;
  }

  private async Task UpdateLocationRating(Guid LocationId)
  {
    Location? location = await dataContext.Locations.FindAsync(LocationId);
    if (location is null) { return; }

    List<float> allReviewsForLocation = await dataContext.Reviews.Where(l => LocationId == l.LocationId).Select(l => l.Rating).ToListAsync();

    if (allReviewsForLocation.Count == 0)
    {
      location.Rating = 0;
    }
    else
    {
      location.Rating = (float)Math.Round((decimal)allReviewsForLocation.Average(), 1);
    }
  }
}
