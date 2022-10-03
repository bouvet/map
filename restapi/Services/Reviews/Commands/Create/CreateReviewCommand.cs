using ErrorOr;
using MediatR;
using restapi.Services.Reviews.Common;

namespace restapi.Services.Reviews.Commands.Create;

public record CreateReviewCommand(
  float Rating,
  string? Text,
  IFormFile? Image,
  Guid LocationId,
  Guid? UserId
) : IRequest<ErrorOr<ReviewResult>>;