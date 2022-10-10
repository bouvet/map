using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Data;
using restapi.Models;
using restapi.Services.ImageStorages.Commands.Upload;
using restapi.Services.ImageStorages.Common;
using restapi.Services.Reviews.Common;

namespace restapi.Services.Reviews.Commands.Create;

public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand, ErrorOr<ReviewResult>>
{
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly ISender mediator;

  public CreateReviewCommandHandler(DataContext dataContext, IDateTimeProvider dateTimeProvider, ISender mediator)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
    this.mediator = mediator;
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

    if (request.Image is not null)
    {
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

    if (string.IsNullOrEmpty(request.Text) && request.Image is null)
    {
      review.Status = "Approved";
    }

    await dataContext.Reviews.AddAsync(review, cancellationToken);
    await dataContext.SaveChangesAsync(cancellationToken);
    await UpdateLocationRating(review.LocationId);

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
