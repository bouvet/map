namespace restapi.Services.Categories.Commands.Common;

public record CategoryResponse(
  Guid Id,
  string Name,
  string Emoji
);