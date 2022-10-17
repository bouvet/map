namespace restapi.Contracts.Reviews;

public record UpdateReviewRequest(
  string? Status,
  string? Text,
  float Rating,
  IFormFile? Image,
  Guid? LocationId
);