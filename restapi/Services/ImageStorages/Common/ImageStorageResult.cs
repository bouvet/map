using restapi.Entities;

namespace restapi.Services.ImageStorages.Common;

public record ImageStorageResult(
  Image OriginalImage,
  Image WebpImage
);