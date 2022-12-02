using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Data;
using restapi.Entities;
using restapi.Services.ImageStorages.Commands.Delete;
using restapi.Services.ImageStorages.Commands.Upload;
using restapi.Services.ImageStorages.Common;

namespace restapi.Services.Reviews.Commands.Update;

public class UpdateReviewCommandHandler : IRequestHandler<UpdateReviewCommand, ErrorOr<Updated>>
{
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly ISender mediator;

  public UpdateReviewCommandHandler(DataContext dataContext, IDateTimeProvider dateTimeProvider, ISender mediator)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
    this.mediator = mediator;
  }

  public async Task<ErrorOr<Updated>> Handle(UpdateReviewCommand request, CancellationToken cancellationToken)
  {
    List<Error> errors = new();

    if (request.Review is null)
    {
      return Errors.Review.NotFound;
    }

    if (!string.IsNullOrEmpty(request.Text))
    {
      request.Review.Text = request.Text;
    }

    if (!string.IsNullOrEmpty(request.Status))
    {
      request.Review.Status = request.Status;
    }

    if (request.LocationId is not null)
    {
      request.Review.LocationId = (Guid)request.LocationId;
    }

    if (request.Rating > 0)
    {
      if (request.Rating is < Review.MinRatingValue or > Review.MaxRatingValue)
      {
        errors.Add(Errors.Review.InvalidRating);
      }
      else
      {
        request.Review.Rating = request.Rating;
      }
    }

    request.Review.Editor = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

    if (request.Image is not null)
    {
      if (request.Review.WebpImage is not null)
      {
        var deleteImageCommand = new DeleteImageCommand(request.Review.WebpImage.Id, "webp");

        ErrorOr<Deleted> deleteImageResult = await mediator.Send(deleteImageCommand, cancellationToken);

        if (deleteImageResult.IsError)
        {
          return Errors.ImageStorage.DeleteFailed;
        }
      }

      var uploadImageCommand = new UploadImageCommand(
        request.Image,
        request.Review.Editor,
        request.Review.LocationId,
        request.Review.Id
      );

      ErrorOr<ImageStorageResult> uploadResult = await mediator.Send(uploadImageCommand, cancellationToken);

      if (uploadResult.IsError)
      {
        return Errors.ImageStorage.UploadFailed;
      }

      request.Review.OriginalImage = uploadResult.Value.OriginalImage;
      request.Review.WebpImage = uploadResult.Value.WebpImage;
    }

    request.Review.Updated = dateTimeProvider.CEST;

    await UpdateLocationRating(request.Review.LocationId);
    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Updated;
  }

  // TODO: Extract to Service utils!!
  private async Task UpdateLocationRating(Guid LocationId)
  {
    Location? location = await dataContext.Locations.FindAsync(LocationId);
    if (location is null) { return; }

    List<float> allReviewsForLocation = await dataContext.Reviews.Where(l => LocationId == l.LocationId).Select(l => l.Rating).ToListAsync();
    location.Rating = (float)Math.Round((decimal)allReviewsForLocation.Average(), 1);
  }
}
