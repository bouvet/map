using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Entities;
using restapi.Services.ImageStorages.Commands.Delete;
using restapi.Services.ImageStorages.Commands.Upload;
using restapi.Services.ImageStorages.Common;

namespace restapi.Services.Users.Commands.Update;

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, ErrorOr<Updated>>
{
  private readonly DataContext dataContext;
  private readonly ISender mediator;

  public UpdateUserCommandHandler(DataContext dataContext, ISender mediator)
  {
    this.dataContext = dataContext;
    this.mediator = mediator;
  }

  public async Task<ErrorOr<Updated>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
  {
    var user = await dataContext.Users.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (user == null)
    {
      return Errors.User.NotFound;
    }

    // TODO: Validate user-input
    MapUpdatedUser(user, request);

    if (request.FavoriteCategoryIds?.Count > 0)
    {
      user.FavoriteCategories = new List<Category>();

      foreach (Guid categoryId in request.FavoriteCategoryIds)
      {
        var category = await dataContext.Categories.FindAsync(new object?[] { categoryId }, cancellationToken: cancellationToken);

        if (category is not null)
        {
          user.FavoriteCategories.Add(category);
        }
      }
    }

    if (request.ProfileImage is not null)
    {
      var uploadImageCommand = new UploadImageCommand(
        request.ProfileImage,
        user,
        null,
        null
      );

      ErrorOr<ImageStorageResult> uploadResult = await mediator.Send(uploadImageCommand, cancellationToken);

      if (uploadResult.IsError)
      {
        return Errors.ImageStorage.UploadFailed;
      }

      if (user.WebpProfileImage is not null)
      {
        var deleteImageCommand = new DeleteImageCommand(user.WebpProfileImage.Id, "webp");
        ErrorOr<Deleted> deleteImageResult = await mediator.Send(deleteImageCommand, cancellationToken);
        if (deleteImageResult.IsError)
        {
          return Errors.ImageStorage.DeleteFailed;
        }
      }

      user.OriginalProfileImage = uploadResult.Value.OriginalImage;
      user.WebpProfileImage = uploadResult.Value.WebpImage;
    }

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Updated;
  }

  private static User MapUpdatedUser(User user, UpdateUserCommand request)
  {
    user.FirstName = string.IsNullOrEmpty(request.FirstName) ? user.FirstName : request.FirstName;
    user.LastName = string.IsNullOrEmpty(request.LastName) ? user.LastName : request.LastName;
    user.Address = string.IsNullOrEmpty(request.Address) ? user.Address : request.Address;
    user.PostalArea = string.IsNullOrEmpty(request.PostalArea) ? user.PostalArea : request.PostalArea;

    user.PostalCode = request.PostalCode is not > 0 ? user.PostalCode : request.PostalCode;
    user.PhoneNumber = request.PhoneNumber is not > 0 ? user.PhoneNumber : request.PhoneNumber;

    user.DOB = request.DOB ?? user.DOB;

    return user;
  }
}
