using restapi.Contracts.Users;

namespace restapi.Contracts.ImageStorage;

public record ImageStorageResponse(
  Guid Id,
  string OriginalFileName,
  Uri BlobUri,
  Uri CdnUri,
  string ContentType,
  DateTime Uploaded,
  MinifiedUserResponse? Uploader,
  Guid? OriginalImageId,
  Guid? LocationId,
  Guid? ReviewId
);