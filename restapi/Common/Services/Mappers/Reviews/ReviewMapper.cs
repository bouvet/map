using restapi.Common.Services.Mappers.Users;
using restapi.Contracts.Reviews;
using restapi.Services.Reviews.Commands.Create;
using restapi.Services.Reviews.Commands.Delete;
using restapi.Services.Reviews.Commands.Update;
using restapi.Services.Reviews.Common;
using restapi.Services.Reviews.Queries.GetReviewById;
using restapi.Services.Reviews.Queries.GetReviews;

namespace restapi.Common.Services.Mappers.Reviews;

public class ReviewMapper : IReviewMapper
{
  private readonly IUserMapper userMapper;

  public ReviewMapper(IUserMapper userMapper)
  {
    this.userMapper = userMapper;
  }

  public ReviewResponse MapResultToResponse(ReviewResult result)
  {
    return new ReviewResponse(
      result.Review.Id,
      result.Review.Status,
      result.Review.Text,
      result.Review.Image,
      result.Review.Created,
      result.Review.Updated,
      result.Review.Creator is not null ? userMapper.MapUserToUserResponse(result.Review.Creator) : null,
      result.Review.Editor is not null ? userMapper.MapUserToUserResponse(result.Review.Editor) : null,
      result.Review.LocationId
    );
  }

  public List<ReviewResponse> MapResultListToResponseList(List<ReviewResult> resultList)
  {
    var mappedList = new List<ReviewResponse>();

    foreach (ReviewResult result in resultList)
    {
      mappedList.Add(MapResultToResponse(result));
    }

    return mappedList;
  }

  public CreateReviewCommand MapCreateToCommand(CreateReviewRequest request, string userId)
  {
    return new CreateReviewCommand(
      request.Rating,
      request.Text,
      request.Image,
      request.LocationId,
      string.IsNullOrEmpty(userId) ? null : Guid.Parse(userId)
    );
  }

  public GetReviewByIdQuery MapGetByIdToCommand(Guid id)
  {
    return new GetReviewByIdQuery(id);
  }

  public GetReviewsQuery MapGetReviewsToCommand(Guid locationId)
  {
    return new GetReviewsQuery(locationId);
  }

  public UpdateReviewCommand MapUpdateToCommand(UpdateReviewRequest request)
  {
    return new UpdateReviewCommand(
      request.Id,
      request.Status,
      request.Text,
      request.Rating,
      request.Image,
      request.LocationId
    );
  }

  public DeleteReviewCommand MapDeleteToCommand(Guid id)
  {
    return new DeleteReviewCommand(id);
  }
}
