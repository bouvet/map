using ErrorOr;
using MediatR;
using restapi.Entities;

namespace restapi.Services.Locations.Commands.Update;

public record UpdateLocationCommand(
  Guid Id,
  string? Title,
  string? Description,
  IFormFile? Image,
  string? Status,
  double Longitude,
  double Latitude,
  List<Guid>? Category,
  Location? Location,
  Guid? UserId
) : IRequest<ErrorOr<Updated>>;