﻿namespace restapi.Interfaces
{
  public interface ICategoryService
  {
    Task<ServiceResponse<List<Category>>> GetAllCategories();
    Task<ServiceResponse<Category>> GetCategory(Guid id);
    Task<ServiceResponse<Category>> AddCategory(CategoryDto request);
    Task<ServiceResponse<Category>> UpdateCategory(Guid id, CategoryDto request);
    Task<ServiceResponse<Object>> DeleteCategory(Guid id);
  }
}
