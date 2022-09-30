using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Providers;
using restapi.Common.Services;
using restapi.Data;
using restapi.Models;

namespace restapi.Services.Reviews.Commands.Update;

public class UpdateReviewCommandHandler : IRequestHandler<UpdateReviewCommand, ErrorOr<Updated>>
{
  private readonly DataContext dataContext;
  private readonly IAzureBlobStorage azureBlobStorage;
  private readonly IDateTimeProvider dateTimeProvider;

  public UpdateReviewCommandHandler(DataContext dataContext, IAzureBlobStorage azureBlobStorage, IDateTimeProvider dateTimeProvider)
  {
    this.dataContext = dataContext;
    this.azureBlobStorage = azureBlobStorage;
    this.dateTimeProvider = dateTimeProvider;
  }

  public async Task<ErrorOr<Updated>> Handle(UpdateReviewCommand request, CancellationToken cancellationToken)
  {
    List<Error> errors = new();

    if (request.Id == Guid.Empty)
    {
      return Errors.Review.InvalidId;
    }

    var review = await dataContext.Reviews.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

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
      // TODO: Delete old image before uploading new

      ErrorOr<CloudBlockBlob> fileUploadResult = await azureBlobStorage.UploadFile(request.Image);

      if (fileUploadResult.IsError)
      {
        return Errors.AzureBlobStorage.UploadFailed;
      }

      review.Image = fileUploadResult.Value.Uri.ToString().Replace(AzureProvider.AzureBlobStorageServer, AzureProvider.AzureCDNserver);
    }

    review.Updated = dateTimeProvider.CEST;

    await dataContext.SaveChangesAsync(cancellationToken);
    await UpdateLocationRating(review.LocationId);

    return Result.Updated;
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
