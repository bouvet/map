using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Models;
using restapi.Services.Reviews.Common;

namespace restapi.Services.Reviews.Queries.GetReviews;

public class GetReviewsQueryHandler : IRequestHandler<GetReviewsQuery, ErrorOr<List<ReviewResult>>>
{
  private readonly DataContext dataContext;

  public GetReviewsQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<List<ReviewResult>>> Handle(GetReviewsQuery request, CancellationToken cancellationToken)
  {
    List<Review> reviews;

    if (request.LocationId == Guid.Empty)
    {
      reviews = await dataContext.Reviews.ToListAsync(cancellationToken: cancellationToken);
    }
    else
    {
      reviews = await dataContext.Reviews.Where(l => request.LocationId == l.LocationId).ToListAsync(cancellationToken: cancellationToken);
    }

    var reviewResultList = new List<ReviewResult>();

    foreach (Review review in reviews)
    {
      reviewResultList.Add(new ReviewResult(
        review.Id,
        review.Status,
        review.Text,
        review.Image,
        review.Created,
        review.Updated,
        review.LocationId
      ));
    }

    return reviewResultList;
  }
}
