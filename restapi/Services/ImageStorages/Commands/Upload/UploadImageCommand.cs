using ErrorOr;
using MediatR;
using restapi.Entities;
using restapi.Services.ImageStorages.Common;

namespace restapi.Services.ImageStorages.Commands.Upload;

public record UploadImageCommand(
    IFormFile Image,
    User? Uploader,
    Guid? LocationId,
    Guid? ReviewId
  ) : IRequest<ErrorOr<ImageStorageResult>>;