using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Entities;

namespace restapi.Services.Reviews.Commands.Delete;

public class DeleteReviewCommandHandler : IRequestHandler<DeleteReviewCommand, ErrorOr<Deleted>>
{
  private readonly DataContext dataContext;

  public DeleteReviewCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
  {
    var review = await dataContext.Reviews.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (review == null)
    {
      return Errors.Review.NotFound;
    }

    dataContext.Reviews.Remove(review);
    await dataContext.SaveChangesAsync(cancellationToken);
    await UpdateLocationRating(review.LocationId);

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

    await dataContext.SaveChangesAsync();
  }
}
