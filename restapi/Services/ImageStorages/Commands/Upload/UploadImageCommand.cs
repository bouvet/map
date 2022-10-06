using ErrorOr;
using MediatR;
using restapi.Models;
using restapi.Services.ImageStorages.Common;

namespace restapi.Services.ImageStorages.Commands.Upload;

public record UploadImageCommand(
    IFormFile Image,
    User? Creator
  ) : IRequest<ErrorOr<ImageStorageResult>>;