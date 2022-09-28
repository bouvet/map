namespace restapi.Services.Categories.Common;

public record CategoryResponse(
  Guid Id,
  string Name,
  string Emoji
);