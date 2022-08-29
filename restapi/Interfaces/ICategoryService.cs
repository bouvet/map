namespace restapi.Interfaces
{
    public interface ICategoryService
    {
        Task<ServiceResponse<List<Category>>> GetAllCategories();
        Task<ServiceResponse<Category>> GetCategory(int id);
        Task<ServiceResponse<List<Category>>> AddCategory(CategoryDto request);
        Task<ServiceResponse<List<Category>>> UpdateCategory(Category request);
        Task<ServiceResponse<List<Category>>> DeleteCategory(int id);
    }
}
