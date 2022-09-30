using ErrorOr;
using MediatR;

namespace restapi.Services.Locations.Command.Update;

public record UpdateLocationCommand(
  Guid Id,
  string Title,
  string Description,
  IFormFile? Image,
  string Status,
  double Longitude,
  double Latitude,
  List<Guid>? Category
) : IRequest<ErrorOr<Updated>>;