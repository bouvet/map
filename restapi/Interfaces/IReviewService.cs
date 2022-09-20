using ErrorOr;

namespace VerdenVenter.Interfaces
{
  public interface IReviewService
  {
    Task<ErrorOr<ReviewResponseDto>> AddReview(AddReviewDto request);
    Task<ErrorOr<ReviewResponseDto>> GetReview(Guid id);
    Task<ErrorOr<List<ReviewResponseDto>>> GetReviews(Guid locationId);
    Task<ErrorOr<Updated>> UpdateReview(UpdateReviewDto request);
    Task<ErrorOr<Deleted>> DeleteReview(Guid id);
  }
}