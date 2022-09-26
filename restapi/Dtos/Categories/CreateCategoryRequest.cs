namespace restapi.Dtos.Categories;

public record CreateCategoryRequest(
  string Name,
  string Emoji
);