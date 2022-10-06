using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Services.Reviews.Common;

namespace restapi.Services.Reviews.Queries.GetReviewById;

public class GetReviewQueryHandler : IRequestHandler<GetReviewByIdQuery, ErrorOr<ReviewResult>>
{
  private readonly DataContext dataContext;

  public GetReviewQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<ReviewResult>> Handle(GetReviewByIdQuery request, CancellationToken cancellationToken)
  {
    var review = await dataContext.Reviews.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (review is null)
    {
      return Errors.Review.NotFound;
    }

    return new ReviewResult(review);
  }
}
