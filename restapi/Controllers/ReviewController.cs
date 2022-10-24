using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Providers.Authorization;
using restapi.Common.Services.Mappers.Reviews;
using restapi.Contracts.Reviews;
using restapi.Data;
using restapi.Services.Reviews.Common;

namespace restapi.Controllers;

public class ReviewsController : ApiController
{
  private readonly ISender mediator;
  private readonly IReviewMapper reviewMapper;
  private readonly DataContext dataContext;
  private readonly IAuthorizationProvider authorizationProvider;

  public ReviewsController(ISender mediator, IReviewMapper reviewMapper, DataContext dataContext, IAuthorizationProvider authorizationProvider)
  {
    this.mediator = mediator;
    this.reviewMapper = reviewMapper;
    this.dataContext = dataContext;
    this.authorizationProvider = authorizationProvider;
  }

  [HttpPost]
  public async Task<IActionResult> CreateReview([FromForm] CreateReviewRequest request)
  {
    var userId = HttpContext.User.FindFirst("userId")?.Value;

    var createReviewCommand = reviewMapper.MapCreateToCommand(request, userId ?? "");

    ErrorOr<ReviewResult> createReviewResult = await mediator.Send(createReviewCommand);

    return createReviewResult.Match(
      result => CreatedAtGetReview(result),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetReviewById(Guid id)
  {
    var getReviewByIdQuery = reviewMapper.MapGetByIdToCommand(id);

    ErrorOr<ReviewResult> getReviewByIdResult = await mediator.Send(getReviewByIdQuery);

    return getReviewByIdResult.Match(
      result => Ok(reviewMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet]
  public async Task<IActionResult> GetReviews(Guid locationId)
  {
    var getReviewsQuery = reviewMapper.MapGetReviewsToCommand(locationId);

    ErrorOr<List<ReviewResult>> getReviewsResult = await mediator.Send(getReviewsQuery);

    return getReviewsResult.Match(
      result => Ok(reviewMapper.MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "User, Administrator")]
  [HttpPut("{id:guid}")]
  public async Task<IActionResult> UpdateReview(Guid id, [FromForm] UpdateReviewRequest request)
  {
    var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, null);

    var review = await dataContext.Reviews.FindAsync(id);

    if (!authResult.IsAdmin && review?.Creator?.Id != authResult.UserId)
    {
      return Forbid();
    }

    var updateReviewCommand = reviewMapper.MapUpdateToCommand(request, review, authResult.UserId);

    ErrorOr<Updated> updateReviewResult = await mediator.Send(updateReviewCommand);

    return updateReviewResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "User, Administrator")]
  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteReview(Guid id)
  {
    var authResult = authorizationProvider.CheckAuthorization(HttpContext.User, id);

    var review = await dataContext.Reviews.FindAsync(id);

    if (!authResult.IsAdmin && review?.Creator?.Id != authResult.UserId)
    {
      return Forbid();
    }

    var deleteReviewCommand = reviewMapper.MapDeleteToCommand(review!);

    ErrorOr<Deleted> deleteReviewResult = await mediator.Send(deleteReviewCommand);

    return deleteReviewResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private CreatedAtActionResult CreatedAtGetReview(ReviewResult result)
  {
    return CreatedAtAction(
        actionName: nameof(GetReviewById),
        routeValues: new { id = result.Review.Id },
        value: reviewMapper.MapResultToResponse(result)
      );
  }
}