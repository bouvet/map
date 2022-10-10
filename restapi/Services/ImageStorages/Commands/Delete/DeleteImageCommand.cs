using ErrorOr;
using MediatR;

namespace restapi.Services.ImageStorages.Commands.Delete;

public record DeleteImageCommand(
  Guid Id
) : IRequest<ErrorOr<Deleted>>;