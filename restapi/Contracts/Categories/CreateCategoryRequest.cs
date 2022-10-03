namespace restapi.Contracts.Categories;

public record CreateCategoryRequest(
  string Name,
  string Emoji
);