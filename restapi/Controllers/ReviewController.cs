using ErrorOr;

namespace VerdenVenter.Controllers
{
  public class ReviewsController : ApiController
  {
    private readonly IReviewService reviewService;

    public ReviewsController(IReviewService reviewService)
    {
      this.reviewService = reviewService;
    }

    [HttpPost]
    public async Task<IActionResult> AddReview([FromForm] AddReviewDto request)
    {
      ErrorOr<ReviewResponseDto> addReviewResult = await reviewService.AddReview(request);

      return addReviewResult.Match(
        addReviewResult => CreatedAtGetReview(addReviewResult),
        errors => Problem(errors)
      );
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetReview(Guid id)
    {
      ErrorOr<ReviewResponseDto> getReviewResult = await reviewService.GetReview(id);

      return getReviewResult.Match(
        review => Ok(review),
        errors => Problem(errors)
      );
    }

    [HttpGet]
    public async Task<IActionResult> GetAllReviews(Guid locationId)
    {
      ErrorOr<List<ReviewResponseDto>> getReviewsResult = await reviewService.GetReviews(locationId);

      return getReviewsResult.Match(
        reviews => Ok(reviews),
        errors => Problem(errors)
      );
    }

    [HttpPut]
    public async Task<IActionResult> UpdateReview([FromForm] UpdateReviewDto request)
    {
      ErrorOr<Updated> updateReviewResult = await reviewService.UpdateReview(request);

      return updateReviewResult.Match(
        _ => NoContent(),
        errors => Problem(errors)
      );
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteReview(Guid id)
    {
      ErrorOr<Deleted> deleteReviewResult = await reviewService.DeleteReview(id);

      return deleteReviewResult.Match(
        _ => NoContent(),
        errors => Problem(errors)
      );
    }

    private CreatedAtActionResult CreatedAtGetReview(ReviewResponseDto review)
    {
      return CreatedAtAction(
          actionName: nameof(GetReview),
          routeValues: new { id = review.Id },
          value: review
        );
    }
  }
}