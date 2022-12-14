using restapi.Contracts.ImageStorage;
using restapi.Entities;
using restapi.Services.ImageStorages.Common;

namespace restapi.Common.Services.Mappers.ImageStorage;

public interface IImageStorageMapper
{
  ImageStorageResponse MapResultToResponse(ImageStorageResult result);
  ImageStorageResponse MapDbResultToResponse(Image image);
}