using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Contracts.Reviews;
using restapi.Contracts.Users;
using restapi.Models;
using restapi.Services.Reviews.Commands.Create;
using restapi.Services.Reviews.Commands.Delete;
using restapi.Services.Reviews.Commands.Update;
using restapi.Services.Reviews.Common;
using restapi.Services.Reviews.Queries.GetReviewById;
using restapi.Services.Reviews.Queries.GetReviews;

namespace restapi.Controllers;

public class ReviewsController : ApiController
{
  private readonly ISender mediator;

  public ReviewsController(ISender mediator)
  {
    this.mediator = mediator;
  }

  [HttpPost]
  public async Task<IActionResult> CreateReview([FromForm] CreateReviewRequest request)
  {
    var userId = HttpContext.User.FindFirst("userId")?.Value;

    var createReviewCommand = new CreateReviewCommand(
      request.Rating,
      request.Text,
      request.Image,
      request.LocationId,
      string.IsNullOrEmpty(userId) ? null : Guid.Parse(userId)
    );

    ErrorOr<ReviewResult> createReviewResult = await mediator.Send(createReviewCommand);

    return createReviewResult.Match(
      result => CreatedAtGetReview(result),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetReviewById(Guid id)
  {
    var getReviewByIdQuery = new GetReviewByIdQuery(id);

    ErrorOr<ReviewResult> getReviewByIdResult = await mediator.Send(getReviewByIdQuery);

    return getReviewByIdResult.Match(
      result => Ok(MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet]
  public async Task<IActionResult> GetReviews(Guid locationId)
  {
    var getReviewsQuery = new GetReviewsQuery(locationId);

    ErrorOr<List<ReviewResult>> getReviewsResult = await mediator.Send(getReviewsQuery);

    return getReviewsResult.Match(
      result => Ok(MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [HttpPut]
  public async Task<IActionResult> UpdateReview([FromForm] UpdateReviewRequest request)
  {
    var updateReviewCommand = new UpdateReviewCommand(
      request.Id,
      request.Status,
      request.Text,
      request.Rating,
      request.Image,
      request.LocationId
    );

    ErrorOr<Updated> updateReviewResult = await mediator.Send(updateReviewCommand);

    return updateReviewResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteReview(Guid id)
  {
    var deleteReviewCommand = new DeleteReviewCommand(id);

    ErrorOr<Deleted> deleteReviewResult = await mediator.Send(deleteReviewCommand);

    return deleteReviewResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private static UserResponse MapUserResponse(User user)
  {
    return new UserResponse(
       user.Id,
       user.Email,
       user.FirstName,
       user.LastName,
       user.Address,
       user.PostalArea,
       user.PostalCode,
       user.PhoneNumber,
       user.DOB,
       user.Roles
      );
  }

  private static ReviewResponse MapResultToResponse(ReviewResult result)
  {
    return new ReviewResponse(
      result.Review.Id,
      result.Review.Status,
      result.Review.Text,
      result.Review.Image,
      result.Review.Created,
      result.Review.Updated,
      result.Review.Creator is not null ? MapUserResponse(result.Review.Creator) : null,
      result.Review.Editor is not null ? MapUserResponse(result.Review.Editor) : null,
      result.Review.LocationId
    );
  }

  private static List<ReviewResponse> MapResultListToResponseList(List<ReviewResult> resultList)
  {
    var mappedList = new List<ReviewResponse>();

    foreach (ReviewResult result in resultList)
    {
      mappedList.Add(MapResultToResponse(result));
    }

    return mappedList;
  }

  private CreatedAtActionResult CreatedAtGetReview(ReviewResult result)
  {
    return CreatedAtAction(
        actionName: nameof(GetReviewById),
        routeValues: new { id = result.Review.Id },
        value: MapResultToResponse(result)
      );
  }
}