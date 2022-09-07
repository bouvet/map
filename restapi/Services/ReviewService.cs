namespace restapi.Services
{
  public class ReviewService : IReviewService
  {
    private readonly DataContext dataContext;

    public ReviewService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }
    public async Task<ServiceResponse<ReviewResponseDto>> AddReview(AddReviewDto newReview)
    {
      var response = new ServiceResponse<ReviewResponseDto> { };
      try
      {
        if (newReview.Rating > 5)
        {
          response.StatusCode = StatusCodes.Status400BadRequest;
          response.Message = "Rating can't be higher than 5";
          return response;
        }
        var location = await dataContext.Locations.FindAsync(newReview.LocationId);
        if (location == null)
        {
          response.StatusCode = StatusCodes.Status400BadRequest;
          response.Message = "Adding review failed, please try again";
          return response;
        }

        var review = new Review
        {
          Rating = newReview.Rating,
        };

        if (!string.IsNullOrEmpty(newReview.Text))
        {
          review.Text = newReview.Text;
        }

        review.LocationId = newReview.LocationId;

        dataContext.Reviews.Add(review);
        await dataContext.SaveChangesAsync();

        response.Data = ReviewResponseBuilder(review);
        response.Success = true;
        response.Message = "Review successfully created!";
        response.StatusCode = StatusCodes.Status201Created;

      }
      catch (System.Exception)
      {
        return response;
      }
      return response;
    }

    public async Task<ServiceResponse<List<ReviewResponseDto>>> GetReviews(Guid locationId)
    {
      var response = new ServiceResponse<List<ReviewResponseDto>> { };

      List<Review> reviews;

      if (locationId == Guid.Empty)
      {
        reviews = await dataContext.Reviews.ToListAsync();
      }
      else
      {
        reviews = await dataContext.Reviews.Where(l => locationId == l.LocationId).ToListAsync();
      }

      var reviewResponseList = new List<ReviewResponseDto> { };
      foreach (Review review in reviews)
      {
        reviewResponseList.Add(ReviewResponseBuilder(review));
      }
      response.Data = reviewResponseList;
      response.StatusCode = StatusCodes.Status200OK;
      response.Success = true;
      response.Message = "";
      return response;
    }

    public async Task<ServiceResponse<ReviewResponseDto>> UpdateReview(Guid reviewId, UpdateReviewDto request)
    {

      var response = new ServiceResponse<ReviewResponseDto> { };

      if (reviewId == Guid.Empty)
      {
        response.Message = "ReviewId must be provided";
        response.StatusCode = StatusCodes.Status400BadRequest;
        response.Success = false;
        return response;
      }

      var review = await dataContext.Reviews.FindAsync(reviewId);

      if (review == null)
      {
        response.Message = "Review not found, please try again";
        response.StatusCode = StatusCodes.Status400BadRequest;
        response.Success = false;
        return response;
      }

      if (!string.IsNullOrEmpty(request.Text))
      {
        review.Text = request.Text;
      }

      if (!string.IsNullOrEmpty(request.Status))
      {
        review.Status = request.Status;
      }

      if (request.LocationId != Guid.Empty)
      {
        review.LocationId = request.LocationId;
      }

      if (request.Rating > 0)
      {
        review.Rating = request.Rating;
      }

      review.Updated = DateTime.Now;

      await dataContext.SaveChangesAsync();

      response.Data = ReviewResponseBuilder(review);
      response.StatusCode = StatusCodes.Status200OK;
      response.Message = "Review successfully updated!";
      response.Success = true;

      return response;

    }

    public async Task<ServiceResponse<DeleteReviewDto>> DeleteReview(Guid id)
    {
      var review = await dataContext.Reviews.FindAsync(id);
      var response = new ServiceResponse<DeleteReviewDto> { };
      if (review == null)
      {
        response.Message = "Review was not found, please try again";
        response.StatusCode = StatusCodes.Status404NotFound;
        return response;
      }

      dataContext.Reviews.Remove(review);
      await dataContext.SaveChangesAsync();

      response.Message = "Review successfully deleted!";
      response.Success = true;
      response.StatusCode = 204;
      return response;
    }

    private ReviewResponseDto ReviewResponseBuilder(Review review)
    {
      return new ReviewResponseDto
      {
        Id = review.Id,
        Created = review.Created,
        Updated = review.Updated,
        Rating = review.Rating,
        Status = review.Status,
        Text = review.Text,
        LocationId = review.LocationId
      };
    }
  }
}