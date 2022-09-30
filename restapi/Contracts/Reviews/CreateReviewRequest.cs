namespace restapi.Contracts.Reviews;

public record CreateReviewRequest(
  float Rating,
  string? Text,
  IFormFile? Image,
  Guid LocationId
);