namespace restapi.Interfaces
{
    public interface ICategoryService
    {
        Task<ServiceResponse<List<Category>>> GetAllCategories();
        Task<ServiceResponse<Category>> GetCategory(int id);
        Task<ServiceResponse<Category>> AddCategory(CategoryDto request);
        Task<ServiceResponse<Category>> UpdateCategory(Category request);
        Task<ServiceResponse<Object>> DeleteCategory(int id);
    }
}
