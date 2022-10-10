using restapi.Contracts.ImageStorage;
using restapi.Contracts.Users;

namespace restapi.Contracts.Reviews;

public record ReviewResponse(
  Guid Id,
  string Status,
  string? Text,
  float Rating,
  ImageStorageResponse? OriginalImage,
  ImageStorageResponse? WebpImage,
  DateTime Created,
  DateTime? Updated,
  MinifiedUserResponse? Creator,
  MinifiedUserResponse? Editor,
  Guid LocationId
);