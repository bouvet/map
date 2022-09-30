namespace restapi.Contracts.Reviews;

public record UpdateReviewRequest(
  Guid Id,
  string? Status,
  string? Text,
  float Rating,
  IFormFile? Image,
  Guid? LocationId
);