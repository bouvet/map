using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Data;
using restapi.Models;
using restapi.Services.ImageStorages.Commands.Upload;
using restapi.Services.ImageStorages.Common;

namespace restapi.Services.Reviews.Commands.Update;

public class UpdateReviewCommandHandler : IRequestHandler<UpdateReviewCommand, ErrorOr<Updated>>
{
  private readonly Data.DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly ISender mediator;

  public UpdateReviewCommandHandler(Data.DataContext dataContext, IDateTimeProvider dateTimeProvider, ISender mediator)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
    this.mediator = mediator;
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

    if (review.Creator?.Id != request.UserId)
    {
      return Errors.Authentication.Forbidden;
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
      //TODO: Delete old images before updating!

      var uploadImageCommand = new UploadImageCommand(
        request.Image,
        review.Creator,
        review.LocationId,
        review.Id
      );

      ErrorOr<ImageStorageResult> uploadResult = await mediator.Send(uploadImageCommand, cancellationToken);

      if (uploadResult.IsError)
      {
        return Errors.ImageStorage.UploadFailed;
      }

      review.OriginalImage = uploadResult.Value.OriginalImage;
      review.WebpImage = uploadResult.Value.WebpImage;
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
