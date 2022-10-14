using restapi.Contracts.Reviews;
using restapi.Entities;
using restapi.Services.Reviews.Commands.Create;
using restapi.Services.Reviews.Commands.Delete;
using restapi.Services.Reviews.Commands.Update;
using restapi.Services.Reviews.Common;
using restapi.Services.Reviews.Queries.GetReviewById;
using restapi.Services.Reviews.Queries.GetReviews;

namespace restapi.Common.Services.Mappers.Reviews;

public interface IReviewMapper
{
  CreateReviewCommand MapCreateToCommand(CreateReviewRequest request, string userId);
  UpdateReviewCommand MapUpdateToCommand(UpdateReviewRequest request, Review? review, Guid? UserId);
  GetReviewByIdQuery MapGetByIdToCommand(Guid id);
  DeleteReviewCommand MapDeleteToCommand(Guid id);
  GetReviewsQuery MapGetReviewsToCommand(Guid locationId);
  ReviewResponse MapResultToResponse(ReviewResult result);
  List<ReviewResponse> MapResultListToResponseList(List<ReviewResult> resultList);
}