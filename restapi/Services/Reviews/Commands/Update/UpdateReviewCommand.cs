using ErrorOr;
using MediatR;
using restapi.Entities;

namespace restapi.Services.Reviews.Commands.Update;

public record UpdateReviewCommand(
  string? Status,
  string? Text,
  float Rating,
  IFormFile? Image,
  Guid? LocationId,
  Review? Review,
  Guid? UserId
) : IRequest<ErrorOr<Updated>>;