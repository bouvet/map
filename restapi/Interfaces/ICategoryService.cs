using ErrorOr;

namespace restapi.Interfaces
{
  public interface ICategoryService
  {
    Task<ErrorOr<List<Category>>> GetCategories();
    Task<ErrorOr<List<Category>>> GetCategoriesInUse();
    Task<ErrorOr<Category>> GetCategory(Guid id);
    Task<ErrorOr<Category>> AddCategory(CategoryDto request);
    Task<ErrorOr<Updated>> UpdateCategory(Guid id, CategoryDto request);
    Task<ErrorOr<Deleted>> DeleteCategory(Guid id);
  }
}
