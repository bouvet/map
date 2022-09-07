namespace restapi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ReviewsController : ControllerBase
  {
    private readonly IReviewService reviewService;

    public ReviewsController(IReviewService reviewService)
    {
      this.reviewService = reviewService;
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<ReviewResponseDto>>> AddReview(AddReviewDto newReview)
    {
      var response = await reviewService.AddReview(newReview);
      return StatusCode(response.StatusCode, response);
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<ReviewResponseDto>>>> GetAllReviews(Guid locationId)
    {
      var response = await reviewService.GetReviews(locationId);
      return StatusCode(response.StatusCode, response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ServiceResponse<ReviewResponseDto>>> UpdateReview(Guid id, UpdateReviewDto request)
    {
      var response = await reviewService.UpdateReview(id, request);
      return StatusCode(response.StatusCode, response);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<DeleteReviewDto>>> DeleteReview(Guid id)
    {
      var response = await reviewService.DeleteReview(id);
      if (response.StatusCode == 204)
      {
        return StatusCode(response.StatusCode);
      }
      else
      {
        return StatusCode(response.StatusCode, response);
      }
    }
  }
}