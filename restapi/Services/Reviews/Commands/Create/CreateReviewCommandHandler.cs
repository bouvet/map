using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Providers;
using restapi.Common.Services.Storage;
using restapi.Data;
using restapi.Models;
using restapi.Services.Reviews.Common;

namespace restapi.Services.Reviews.Commands.Create;

public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand, ErrorOr<ReviewResult>>
{
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly IAzureBlobStorage azureBlobStorage;

  public CreateReviewCommandHandler(DataContext dataContext, IDateTimeProvider dateTimeProvider, IAzureBlobStorage azureBlobStorage)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
    this.azureBlobStorage = azureBlobStorage;
  }

  public async Task<ErrorOr<ReviewResult>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
  {
    List<Error> errors = new();

    if (request.Rating is < Review.MinRatingValue or > Review.MaxRatingValue)
    {
      errors.Add(Errors.Review.InvalidRating);
    }

    var location = await dataContext.Locations.FindAsync(new object?[] { request.LocationId }, cancellationToken: cancellationToken);

    if (location is null)
    {
      errors.Add(Errors.Review.LocationNotFound);
    }

    var review = new Review
    {
      Id = Guid.NewGuid(),
      Rating = request.Rating,
      Created = dateTimeProvider.CEST
    };

    if (request.UserId is not null)
    {
      var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

      if (user is not null)
      {
        review.Creator = user;
      }
    }

    if (!string.IsNullOrEmpty(request.Text))
    {
      review.Text = request.Text;
    }

    review.LocationId = request.LocationId;

    if (errors.Count > 0)
    {
      return errors;
    }

    // if (request.Image is not null)
    // {
    //   ErrorOr<CloudBlockBlob> fileUploadResult = await azureBlobStorage.UploadFile(request.Image);

    //   if (fileUploadResult.IsError)
    //   {
    //     return Errors.AzureBlobStorage.UploadFailed;
    //   }

    //   review.Image = fileUploadResult.Value.Uri.ToString().Replace(AzureProvider.AzureBlobStorageServer, AzureProvider.AzureCDNserver);
    // }

    // await dataContext.Reviews.AddAsync(review, cancellationToken);
    // await dataContext.SaveChangesAsync(cancellationToken);
    // await UpdateLocationRating(review.LocationId);

    return new ReviewResult(review);
  }

  // TODO: Extract to a more global thing as Create, Update and Delete uses this..
  private async Task UpdateLocationRating(Guid LocationId)
  {
    Location? location = await dataContext.Locations.FindAsync(LocationId);
    if (location is null) { return; }

    List<float> allReviewsForLocation = await dataContext.Reviews.Where(l => LocationId == l.LocationId).Select(l => l.Rating).ToListAsync();
    location.Rating = (float)Math.Round((decimal)allReviewsForLocation.Average(), 1);

    await dataContext.SaveChangesAsync();
  }
}
