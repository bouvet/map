using restapi.Contracts.ImageStorage;
using restapi.Contracts.Users;
using restapi.Entities;
using restapi.Services.ImageStorages.Common;

namespace restapi.Common.Services.Mappers.ImageStorage;

public class ImageStorageMapper : IImageStorageMapper
{
  public ImageStorageResponse MapDbResultToResponse(Image image)
  {
    return new ImageStorageResponse(
      image.Id,
      image.BlobUri,
      image.CdnUri,
      image.ContentType,
      image.Uploaded,
      image.Uploader is not null ? MapUserToMinifiedUserResponse(image.Uploader) : null,
      image.OriginalImageId,
      image.LocationId,
      image.ReviewId
    );
  }

  public ImageStorageResponse MapResultToResponse(ImageStorageResult result)
  {
    throw new NotImplementedException();
  }

  public MinifiedUserResponse MapUserToMinifiedUserResponse(User user)
  {
    return new MinifiedUserResponse(
      user.Id,
      user.Email,
      user.FirstName,
      user.LastName,
      user.DOB
    );
  }
}
