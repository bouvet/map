using ErrorOr;
using MediatR;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Commands.Create;

public record CreateLocationCommand(
  string Title,
  string Description,
  IFormFile? Image,
  double Longitude,
  double Latitude,
  List<Guid>? Category,
  Guid? UserId
) : IRequest<ErrorOr<LocationResult>>;