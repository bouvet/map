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
          Message: "Rating can't be higher than 5",
          data: null);
      }

      var location = await dataContext.Locations.FindAsync(newReview.LocationId);

      if (location == null)
      {
        return new ServiceResponse<ReviewResponseDto>
        (
          StatusCodes.Status400BadRequest,
          Message: "Adding review failed, please try again",
          data: null);
      }

      var currentTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"));

      var review = new Review
      {
        Id = Guid.NewGuid(),
        Rating = newReview.Rating,
        Created = currentTime
      };

      if (!string.IsNullOrEmpty(newReview.Text))
      {
        review.Text = newReview.Text;
      }

      review.LocationId = newReview.LocationId;

      if (newReview.Image is not null)
      {
        CloudBlockBlob blob = await BlobService.UploadFile(newReview.Image);
        review.Image = blob.Uri.ToString();
      }

      await dataContext.Reviews.AddAsync(review);
      await dataContext.SaveChangesAsync();
      await UpdateLocationRating(review.LocationId);

      return new ServiceResponse<ReviewResponseDto>
      (
        StatusCodes.Status201Created,
        Message: "Review successfully created!",
        data: ReviewResponseBuilder(review));
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

      var reviewResponseList = new List<ReviewResponseDto>();

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
            Message: "ReviewId must be provided",
            data: null);
      }

      var review = await dataContext.Reviews.FindAsync(reviewId);

      if (review is null)
      {
        return new ServiceResponse<ReviewResponseDto>
          (
            StatusCodes.Status400BadRequest,
            Message: "Review not found, please try again",
            data: null);
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
        CloudBlockBlob blob = await BlobService.UploadFile(request.Image);
        review.Image = blob.Uri.ToString();
      }

      review.Updated = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"));

      await dataContext.SaveChangesAsync();
      await UpdateLocationRating(review.LocationId);

      return new ServiceResponse<ReviewResponseDto>
                (
                  StatusCodes.Status200OK,
                  Message: "Review successfully updated!",
                  data: ReviewResponseBuilder(review));

    }

    public async Task<ServiceResponse<DeleteReviewDto>> DeleteReview(Guid id)
    {
      var review = await dataContext.Reviews.FindAsync(id);

      if (review == null)
      {
        return new ServiceResponse<DeleteReviewDto>
                (
                  StatusCodes.Status404NotFound,
                  Message: "Review was not found, please try again",
                  data: null);
      }

      dataContext.Reviews.Remove(review);
      await dataContext.SaveChangesAsync();
      await UpdateLocationRating(review.LocationId);

      return new ServiceResponse<DeleteReviewDto>
              (
                StatusCodes.Status204NoContent,
                Message: "Review successfully deleted!",
                data: null);
    }

    private static ReviewResponseDto ReviewResponseBuilder(Review review)
    {

      const string azureBlobStorageServer = ".blob.core.windows.net";
      const string azureCDNserver = ".azureedge.net";

      return new ReviewResponseDto
      {
        Id = review.Id,
        Created = review.Created,
        Updated = review.Updated,
        Rating = review.Rating,
        Status = review.Status,
        Text = review.Text ?? "",
        Image = review.Image.Replace(azureBlobStorageServer, azureCDNserver),
        LocationId = review.LocationId
      };
    }

    private async Task UpdateLocationRating(Guid LocationId)
    {
      Location? location = await dataContext.Locations.FindAsync(LocationId);
      if (location is null) { return; }

      List<float> allReviewsForLocation = await dataContext.Reviews.Where(l => LocationId == l.LocationId).Select(l => l.Rating).ToListAsync();
      location.Rating = (float)Math.Round((decimal)allReviewsForLocation.Average(), 1);

      await dataContext.SaveChangesAsync();
    }
  }
}