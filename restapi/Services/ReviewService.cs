using Microsoft.WindowsAzure.Storage.Blob;

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

      if (newReview.Rating > 5)
      {
        return new ServiceResponse<ReviewResponseDto>
        (
          StatusCodes.Status400BadRequest,
          data: null,
          Message: "Rating can't be higher than 5"
        );
      }

      var location = await dataContext.Locations.FindAsync(newReview.LocationId);

      if (location == null)
      {
        return new ServiceResponse<ReviewResponseDto>
        (
          StatusCodes.Status400BadRequest,
          data: null,
          Message: "Adding review failed, please try again"
        );
      }

      var review = new Review
      {
        Id = Guid.NewGuid(),
        Rating = newReview.Rating,
      };

      if (!string.IsNullOrEmpty(newReview.Text))
      {
        review.Text = newReview.Text;
      }

      review.LocationId = newReview.LocationId;

      if (newReview.Image is not null)
      {
        CloudBlockBlob blob = await BlobService.UploadFile(review.Id, newReview.Image);
        review.Image = blob.Uri.ToString();
      }

      await dataContext.Reviews.AddAsync(review);
      await dataContext.SaveChangesAsync();

      return new ServiceResponse<ReviewResponseDto>
      (
        StatusCodes.Status201Created,
        data: ReviewResponseBuilder(review),
        Message: "Review successfully created!"
      );
    }

    public async Task<ServiceResponse<List<ReviewResponseDto>>> GetReviews(Guid locationId)
    {
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

      return new ServiceResponse<List<ReviewResponseDto>>
        (
          StatusCodes.Status200OK,
          data: reviewResponseList
        );
    }

    public async Task<ServiceResponse<ReviewResponseDto>> UpdateReview(Guid reviewId, UpdateReviewDto request)
    {
      if (reviewId == Guid.Empty)
      {
        return new ServiceResponse<ReviewResponseDto>
          (
            StatusCodes.Status400BadRequest,
            data: null,
            Message: "ReviewId must be provided"
          );
      }

      var review = await dataContext.Reviews.FindAsync(reviewId);

      if (review is null)
      {
        return new ServiceResponse<ReviewResponseDto>
          (
            StatusCodes.Status400BadRequest,
            data: null,
            Message: "Review not found, please try again"
          );
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

      if (request.Image is not null)
      {
        CloudBlockBlob blob = await BlobService.UploadFile(review.Id, request.Image);
        review.Image = blob.Uri.ToString();
      }

      review.Updated = DateTime.Now;

      await dataContext.SaveChangesAsync();

      return new ServiceResponse<ReviewResponseDto>
                (
                  StatusCodes.Status200OK,
                  data: ReviewResponseBuilder(review),
                  Message: "Review successfully updated!"
                );

    }

    public async Task<ServiceResponse<DeleteReviewDto>> DeleteReview(Guid id)
    {
      var review = await dataContext.Reviews.FindAsync(id);

      if (review == null)
      {
        return new ServiceResponse<DeleteReviewDto>
                (
                  StatusCodes.Status404NotFound,
                  data: null,
                  Message: "Review was not found, please try again"
                );
      }

      dataContext.Reviews.Remove(review);
      await dataContext.SaveChangesAsync();

      return new ServiceResponse<DeleteReviewDto>
              (
                StatusCodes.Status204NoContent,
                data: null,
                Message: "Review successfully deleted!"
              );
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
        Image = review.Image,
        LocationId = review.LocationId
      };
    }
  }
}