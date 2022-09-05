using Microsoft.Extensions.FileProviders;
using System;

namespace restapi.Services
{
  public class CategoryService : ICategoryService
  {
    private readonly DataContext dataContext;

    public CategoryService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }

    public async Task<ServiceResponse<List<Category>>> GetAllCategories()
    {

      try
      {
        List<Category> categories = await dataContext.Categories.ToListAsync();
        return GetCategoryServiceResponse<List<Category>>(StatusCodes.Status200OK, msg: "Fetched all Categories!", data: categories);
      }
      catch (Exception)
      {
        return GetCategoryServiceResponse<List<Category>>(StatusCodes.Status500InternalServerError);
      }
    }

    public async Task<ServiceResponse<Category>> GetCategory(int id)
    {
      try
      {
        if (id < 1)
        {
          return GetCategoryServiceResponse<Category>(StatusCodes.Status400BadRequest, msg: $"id {id} is not valid, please use a positive integer value");
        }

        var category = await dataContext.Categories.FindAsync(id);

        if (category is null)
        {
          return GetCategoryServiceResponse<Category>(StatusCodes.Status404NotFound, msg: $"Category with id {id} not Found");
        }

        return GetCategoryServiceResponse<Category>(StatusCodes.Status200OK, msg: "Category fetched!", data: category);
      }
      catch (Exception)
      {
        return GetCategoryServiceResponse<Category>(StatusCodes.Status500InternalServerError);
      }
    }

    public async Task<ServiceResponse<Category>> AddCategory(CategoryDto request)
    {

      try
      {

        var existingCategoryWithSameName = dataContext.Categories.Where(c => c.Name == request.Name).ToList();
        if (existingCategoryWithSameName.Count() > 0)
        {
          return GetCategoryServiceResponse<Category>(StatusCodes.Status409Conflict,
                                        data: existingCategoryWithSameName.First(),
                                        msg: $"Category with name {request.Name} already exist as [id: {existingCategoryWithSameName.First().Id}, name: {existingCategoryWithSameName.First().Name}, emoji: {existingCategoryWithSameName.First().Emoji}]");
        }

        var category = new Category { Name = request.Name, Emoji = request.Emoji };

        dataContext.Categories.Add(category);
        await dataContext.SaveChangesAsync();

        return GetCategoryServiceResponse<Category>(StatusCodes.Status200OK, data: category, msg: "Category Added!");
      }
      catch (Exception)
      {
        return GetCategoryServiceResponse<Category>(StatusCodes.Status500InternalServerError);
      }
    }

    public async Task<ServiceResponse<Category>> UpdateCategory(int id, CategoryDto request)
    {
      try
      {
        if (id < 1)
        {
          return GetCategoryServiceResponse<Category>(StatusCodes.Status400BadRequest, msg: $"id {id} is not valid, please use a positive integer value");
        }

        var category = await dataContext.Categories.FindAsync(id);

        if (category == null)
        {
          return GetCategoryServiceResponse<Category>(StatusCodes.Status404NotFound, msg: $"Category with id {id} not Found");
        }

        category.Name = request.Name;
        category.Emoji = request.Emoji;
        await dataContext.SaveChangesAsync();

        return GetCategoryServiceResponse<Category>(StatusCodes.Status200OK, data: category, msg: "Category Updated!");
      }
      catch (Exception)
      {
        return GetCategoryServiceResponse<Category>(StatusCodes.Status500InternalServerError);
      }
    }

    public async Task<ServiceResponse<Object>> DeleteCategory(int id)
    {
      try
      {
        if (id < 1)
        {
          return GetCategoryServiceResponse<Object>(StatusCodes.Status400BadRequest, msg: $"id {id} is not valid, please use a positive integer value");
        }

        var category = await dataContext.Categories.FindAsync(id);
        if (category is null)
        {
          return GetCategoryServiceResponse<Object>(StatusCodes.Status404NotFound, msg: $"Category with id {id} not Found");
        }

        var locationsWhereCategoryIsUsed = dataContext.Entry(category).Collection(c => c.Locations).Query().AsEnumerable().ToList();
        if (locationsWhereCategoryIsUsed.Count() > 0)
        {
          return GetCategoryServiceResponse<Object>(StatusCodes.Status409Conflict, data: locationsWhereCategoryIsUsed, msg: $"This category is being used in {locationsWhereCategoryIsUsed.Count()} locations");
        }

        dataContext.Categories.Remove(category);
        await dataContext.SaveChangesAsync();

        return GetCategoryServiceResponse<Object>(StatusCodes.Status204NoContent, msg: "Successfully Deleted!", null);
      }
      catch (Exception)
      {
        return GetCategoryServiceResponse<Object>(StatusCodes.Status500InternalServerError);
      }
    }

    private ServiceResponse<T> GetCategoryServiceResponse<T>(int statusCode, String msg = "", T? data = default(T))
    {
      var response = new ServiceResponse<T>();
      response.StatusCode = statusCode;
      response.Data = data;
      response.Message = msg;

      // code 200-299
      if (response.StatusCode >= 200 && response.StatusCode < 300)
      {
        response.Data = (T?)data;
        response.Success = true;
      }
      if (statusCode >= 300)
      {
        response.Data = default(T);
        response.Success = false;
      }

      if (statusCode == StatusCodes.Status500InternalServerError)
      {
        response.Message = "Ops! something went wrong!";
      }

      return response;
    }
  }
}
