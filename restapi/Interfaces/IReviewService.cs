namespace restapi.Interfaces
{
  public interface IReviewService
  {
    Task<ServiceResponse<ReviewResponseDto>> AddReview(AddReviewDto newReview);
    Task<ServiceResponse<List<ReviewResponseDto>>> GetReviews(Guid locationId);
    Task<ServiceResponse<ReviewResponseDto>> UpdateReview(Guid reviewId, UpdateReviewDto request);
    Task<ServiceResponse<DeleteReviewDto>> DeleteReview(Guid id);
  }
}