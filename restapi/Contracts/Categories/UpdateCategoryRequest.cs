namespace restapi.Contracts.Categories;

public record UpdateCategoryRequest(
  string Name,
  string Emoji
);