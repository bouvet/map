namespace restapi.Interfaces
{
  public interface IReviewService
  {
    Task<ServiceResponse<ReviewResponseDto>> AddReview(AddReviewDto request);
    Task<ServiceResponse<List<ReviewResponseDto>>> GetReviews(Guid locationId);
    Task<ServiceResponse<ReviewResponseDto>> UpdateReview(UpdateReviewDto request);
    Task<ServiceResponse<DeleteReviewDto>> DeleteReview(Guid id);
  }
}