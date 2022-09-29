using ErrorOr;
using MediatR;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Command.UpdateImage;

public record UpdateImageCommand(
  Guid LocationId,
  string ImageURI
) : IRequest<ErrorOr<LocationResult>>;