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
      var response = new ServiceResponse<List<Category>> { };

      try
      {
        var categories = await dataContext.Categories.ToListAsync();

        if (categories is null)
        {
          throw new Exception("Ops, something went wrong!");
        }

        response.StatusCode = StatusCodes.Status200OK;
        response.Data = categories;
        response.Success = true;
        response.Message = "Categories fetched!";
      }
      catch (Exception)
      {
        response.StatusCode = StatusCodes.Status500InternalServerError;
        response.Data = null;
        response.Success = false;
        response.Message = "Ops, something went wrong!";
      }


      return response;
    }

    public async Task<ServiceResponse<Category>> GetCategory(int id)
    {
      var response = new ServiceResponse<Category> { };

      try
      {
        if (id < 1)
        {
          response.StatusCode = StatusCodes.Status400BadRequest;
          throw new Exception($"id {id} is not valid, please use a positive integer value");
        }

        var category = await dataContext.Categories.FindAsync(id);

        if (category is null)
        {
          response.StatusCode = StatusCodes.Status404NotFound;
          throw new Exception($"Category with id {id} not Found");
        }

        response.StatusCode = StatusCodes.Status200OK;
        response.Data = category;
        response.Success = true;
        response.Message = "Category fetched";
      }
      catch (Exception exception)
      {
        response.Data = null;
        response.Success = false;
        response.Message = exception.Message;

        if (response.StatusCode == 0)
        {
          response.StatusCode = StatusCodes.Status500InternalServerError; ;
          response.Message = "Ops, something went wrong!";
        }
      }


      return response;
    }

    public async Task<ServiceResponse<Category>> AddCategory(CategoryDto request)
    {
      var response = new ServiceResponse<Category> { };

      try
      {

        var existingCategoryWithSameName = dataContext.Categories.Where(c => c.Name == request.Name).ToList();
        if (existingCategoryWithSameName.Count() > 0)
        {
          response.StatusCode = StatusCodes.Status409Conflict;
          throw new Exception($"Category with name {request.Name} already exist as [id: {existingCategoryWithSameName.First().Id}, name: {existingCategoryWithSameName.First().Name}, emoji: {existingCategoryWithSameName.First().Emoji}]");
        }

        var category = new Category { Name = request.Name, Emoji = request.Emoji };

        dataContext.Categories.Add(category);
        await dataContext.SaveChangesAsync();

        response.StatusCode = StatusCodes.Status201Created;
        response.Data = category;
        response.Success = true;
        response.Message = "Category added!";
      }
      catch (Exception exception)
      {
        response.Data = null;
        response.Success = false;
        response.Message = exception.Message;
        if (response.StatusCode == 0)
        {
          response.StatusCode = StatusCodes.Status500InternalServerError; ;
          response.Message = "Ops, something went wrong!";
        }
      }


      return response;
    }


    public async Task<ServiceResponse<Category>> UpdateCategory(int id, CategoryDto request)
    {
      var response = new ServiceResponse<Category> { };

      try
      {
        if (id < 1)
        {
          response.StatusCode = StatusCodes.Status400BadRequest;
          throw new Exception($"id {id} is not valid, please use a positive integer value");
        }

        var category = await dataContext.Categories.FindAsync(id);

        if (category == null)
        {
          response.StatusCode = StatusCodes.Status404NotFound;
          throw new Exception($"Category with id {id} not Found");
        }

        category.Name = request.Name;
        category.Emoji = request.Emoji;
        await dataContext.SaveChangesAsync();

        response.Data = category;
        response.Success = true;
        response.StatusCode = StatusCodes.Status200OK;
        response.Message = "Category updated!";
      }
      catch (Exception exception)
      {
        response.Data = null;
        response.Success = false;
        response.Message = exception.Message;

        if (response.StatusCode == 0)
        {
          response.StatusCode = StatusCodes.Status500InternalServerError; ;
          response.Message = "Ops, something went wrong!";
        }
      }


      return response;
    }

    public async Task<ServiceResponse<Object>> DeleteCategory(int id)
    {
      var response = new ServiceResponse<Object> { };

      try
      {

        if (id < 1)
        {
          response.StatusCode = StatusCodes.Status400BadRequest;
          throw new Exception($"id {id} is not valid, please use a positive integer value");
        }

        var category = await dataContext.Categories.FindAsync(id);
        if (category is null)
        {
          response.StatusCode = StatusCodes.Status404NotFound;
          throw new Exception($"Category with id {id} not Found");
        }

        var locationsWhereCategoryIsUsed = dataContext.Entry(category).Collection(c => c.Locations).Query().AsEnumerable().ToList();
        if (locationsWhereCategoryIsUsed.Count() > 0)
        {
          response.StatusCode = StatusCodes.Status409Conflict;
          response.Data = locationsWhereCategoryIsUsed;
          throw new Exception($"This category is being used in {locationsWhereCategoryIsUsed.Count()} locations");
        }

        dataContext.Categories.Remove(category);
        await dataContext.SaveChangesAsync();

        var categories = await dataContext.Categories.ToListAsync();

        response.StatusCode = StatusCodes.Status204NoContent;
        response.Success = true;
        response.Data = null;
        response.Message = "Succsesfully deleted!";

      }
      catch (Exception exception)
      {
        response.Success = false;
        response.Message = exception.Message;

        if (response.StatusCode == 0)
        {
          response.Data = null;
          response.StatusCode = StatusCodes.Status500InternalServerError; ;
          response.Message = "Ops, something went wrong!";
        }
      }


      return response;
    }


  }
}
