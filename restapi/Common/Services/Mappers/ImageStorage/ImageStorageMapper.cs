using restapi.Common.Services.Mappers.Users;
using restapi.Contracts.ImageStorage;
using restapi.Models;
using restapi.Services.ImageStorages.Common;

namespace restapi.Common.Services.Mappers.ImageStorage;

public class ImageStorageMapper : IImageStorageMapper
{
  private readonly IUserMapper userMapper;

  public ImageStorageMapper(IUserMapper userMapper)
  {
    this.userMapper = userMapper;
  }

  public ImageStorageResponse MapDbResultToResponse(Image image)
  {
    return new ImageStorageResponse(
      image.Id,
      image.OriginalFileName,
      image.BlobUri,
      image.CdnUri,
      image.ContentType,
      image.Uploaded,
      image.Uploader is not null ? userMapper.MapUserToMinifiedUserResponse(image.Uploader) : null,
      image.OriginalImageId,
      image.LocationId,
      image.ReviewId
    );
  }

  public ImageStorageResponse MapResultToResponse(ImageStorageResult result)
  {
    throw new NotImplementedException();
  }
}
