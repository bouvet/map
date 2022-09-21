using ErrorOr;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.ServiceErrors;

namespace restapi.Services
{
  public class ReviewService : IReviewService
  {
    private readonly DataContext dataContext;

    public ReviewService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }

    public async Task<ErrorOr<ReviewResponseDto>> AddReview(AddReviewDto request)
    {
      List<Error> errors = new();

      if (request.Rating is < Review.MinRatingValue or > Review.MaxRatingValue)
      {
        errors.Add(Errors.Review.InvalidRating);
      }

      var location = await dataContext.Locations.FindAsync(request.LocationId);

      if (location is null)
      {
        errors.Add(Errors.Review.LocationNotFound);
      }

      var currentTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"));

      var review = new Review
      {
        Id = Guid.NewGuid(),
        Rating = request.Rating,
        Created = currentTime
      };

      if (!string.IsNullOrEmpty(request.Text))
      {
        review.Text = request.Text;
      }

      review.LocationId = request.LocationId;

      if (errors.Count > 0)
      {
        return errors;
      }

      if (request.Image is not null)
      {
        CloudBlockBlob blob = await BlobService.UploadFile(request.Image);
        review.Image = blob.Uri.ToString();
      }

      await dataContext.Reviews.AddAsync(review);
      await dataContext.SaveChangesAsync();
      await UpdateLocationRating(review.LocationId);

      return MapToReviewResponseDto(review);
    }

    public async Task<ErrorOr<ReviewResponseDto>> GetReview(Guid id)
    {
      var review = await dataContext.Reviews.FindAsync(id);

      if (review is null)
      {
        return Errors.Review.NotFound;
      }

      return MapToReviewResponseDto(review);
    }

    public async Task<ErrorOr<List<ReviewResponseDto>>> GetReviews(Guid locationId)
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
        reviewResponseList.Add(MapToReviewResponseDto(review));
      }

      return reviewResponseList;
    }

    public async Task<ErrorOr<Updated>> UpdateReview(UpdateReviewDto request)
    {
      List<Error> errors = new();

      if (request.Id == Guid.Empty)
      {
        return Errors.Review.InvalidId;
      }

      var review = await dataContext.Reviews.FindAsync(request.Id);

      if (review is null)
      {
        return Errors.Review.NotFound;
      }

      if (!string.IsNullOrEmpty(request.Text))
      {
        review.Text = request.Text;
      }

      if (!string.IsNullOrEmpty(request.Status))
      {
        review.Status = request.Status;
      }

      if (request.LocationId is not null)
      {
        review.LocationId = (Guid)request.LocationId;
      }

      if (request.Rating > 0)
      {
        if (request.Rating is < Review.MinRatingValue or > Review.MaxRatingValue)
        {
          errors.Add(Errors.Review.InvalidRating);
        }
        else
        {
          review.Rating = request.Rating;
        }
      }

      if (request.Image is not null)
      {
        CloudBlockBlob blob = await BlobService.UploadFile(request.Image);
        review.Image = blob.Uri.ToString();
      }

      review.Updated = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"));

      await dataContext.SaveChangesAsync();
      await UpdateLocationRating(review.LocationId);

      return Result.Updated;
    }

    public async Task<ErrorOr<Deleted>> DeleteReview(Guid id)
    {
      var review = await dataContext.Reviews.FindAsync(id);

      if (review == null)
      {
        return Errors.Review.NotFound;
      }

      dataContext.Reviews.Remove(review);
      await dataContext.SaveChangesAsync();
      await UpdateLocationRating(review.LocationId);

      return Result.Deleted;
    }

    private static ReviewResponseDto MapToReviewResponseDto(Review review)
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