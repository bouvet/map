using ErrorOr;
using MediatR;

namespace restapi.Services.Reviews.Commands.Update;

public record UpdateReviewCommand(
  Guid Id,
  string? Status,
  string? Text,
  float Rating,
  IFormFile? Image,
  Guid? LocationId
) : IRequest<ErrorOr<Updated>>;