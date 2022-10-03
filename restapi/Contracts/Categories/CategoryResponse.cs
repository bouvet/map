namespace restapi.Contracts.Categories;

public record CategoryResponse(
  Guid Id,
  string Name,
  string Emoji
);