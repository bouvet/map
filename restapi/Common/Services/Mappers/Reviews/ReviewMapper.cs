using restapi.Common.Services.Mappers.ImageStorage;
using restapi.Common.Services.Mappers.Users;
using restapi.Contracts.Reviews;
using restapi.Entities;
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
  private readonly IImageStorageMapper imageStorageMapper;

  public ReviewMapper(IUserMapper userMapper, IImageStorageMapper imageStorageMapper)
  {
    this.userMapper = userMapper;
    this.imageStorageMapper = imageStorageMapper;
  }

  public ReviewResponse MapResultToResponse(ReviewResult result)
  {
    return new ReviewResponse(
      result.Review.Id,
      result.Review.Status,
      result.Review.Text,
      result.Review.Rating,
      result.Review.OriginalImage is not null ? imageStorageMapper.MapDbResultToResponse(result.Review.OriginalImage) : null,
      result.Review.WebpImage is not null ? imageStorageMapper.MapDbResultToResponse(result.Review.WebpImage) : null,
      result.Review.Created,
      result.Review.Updated,
      result.Review.Creator is not null ? userMapper.MapUserToMinifiedUserResponse(result.Review.Creator) : null,
      result.Review.Editor is not null ? userMapper.MapUserToMinifiedUserResponse(result.Review.Editor) : null,
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

  public UpdateReviewCommand MapUpdateToCommand(UpdateReviewRequest request, Review? review, Guid? userId)
  {
    return new UpdateReviewCommand(
      request.Status,
      request.Text,
      request.Rating,
      request.Image,
      request.LocationId,
      review,
      userId
    );
  }

  public DeleteReviewCommand MapDeleteToCommand(Review review)
  {
    return new DeleteReviewCommand(review);
  }
}
