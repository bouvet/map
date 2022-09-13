﻿using Microsoft.Extensions.FileProviders;
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

    public async Task<ServiceResponse<List<Category>>> GetAllCategoriesInUse()
    {
      var allCategories = await dataContext.Categories.ToListAsync();
      var locations = await dataContext.Locations.ToListAsync();

      // var locationsWithCategory = locations.Where(x => (x.Categories.Exists(x => x.Id == categoryId) || (Guid.Empty == categoryId)));

      var categoriesInUse = allCategories.Where(cat => locations.Exists(loc => loc.Categories.Exists(locCat => locCat.Id == cat.Id))).ToList();

      if (categoriesInUse.Count() < 1)
      {
        return new ServiceResponse<List<Category>>(StatusCodes.Status404NotFound, "no category in use");
      }

      return new ServiceResponse<List<Category>>(StatusCodes.Status200OK, Message: "Fetched all Categories in use!", data: categoriesInUse);
    }
    public async Task<ServiceResponse<List<Category>>> GetAllCategories()
    {

      try
      {
        List<Category> categories = await dataContext.Categories.ToListAsync();
        return new ServiceResponse<List<Category>>(StatusCodes.Status200OK, Message: "Fetched all Categories!", data: categories);
      }
      catch (Exception)
      {
        return new ServiceResponse<List<Category>>(StatusCode: StatusCodes.Status500InternalServerError);
      }
    }

    public async Task<ServiceResponse<Category>> GetCategory(Guid id)
    {
      try
      {
        /*if (id < 1)
        {
          return GetCategoryServiceResponse<Category>(StatusCodes.Status400BadRequest, msg: $"id {id} is not valid, please use a positive integer value");
        }*/

        var category = await dataContext.Categories.FindAsync(id);

        if (category is null)
        {
          return new ServiceResponse<Category>(StatusCodes.Status404NotFound, Message: $"Category with id {id} not Found");
        }

        return new ServiceResponse<Category>(StatusCodes.Status200OK, Message: "Category fetched!", data: category);
      }
      catch (Exception)
      {
        return new ServiceResponse<Category>(StatusCodes.Status500InternalServerError);
      }
    }

    public async Task<ServiceResponse<Category>> AddCategory(CategoryDto request)
    {

      try
      {
        List<Category> existingCategoryWithSameName = dataContext.Categories.Where(c => c.Name == request.Name).ToList();
        if (existingCategoryWithSameName.Count() > 0)
        {
          return new ServiceResponse<Category>(StatusCodes.Status409Conflict,
                                        data: existingCategoryWithSameName.First(),
                                        Message: $"Category with name {request.Name} already exist as [id: {existingCategoryWithSameName.First().Id}, name: {existingCategoryWithSameName.First().Name}, emoji: {existingCategoryWithSameName.First().Emoji}]");
        }

        var category = new Category { Name = request.Name, Emoji = request.Emoji };

        dataContext.Categories.Add(category);
        await dataContext.SaveChangesAsync();

        return new ServiceResponse<Category>(StatusCodes.Status201Created, data: category, Message: "Category Added!");
      }
      catch (Exception)
      {
        return new ServiceResponse<Category>(StatusCodes.Status500InternalServerError);
      }
    }

    public async Task<ServiceResponse<Category>> UpdateCategory(Guid id, CategoryDto request)
    {
      try
      {
        // if (id < 1)
        // {
        //   return GetCategoryServiceResponse<Category>(StatusCodes.Status400BadRequest, msg: $"id {id} is not valid, please use a positive integer value");
        // }

        var category = await dataContext.Categories.FindAsync(id);

        if (category == null)
        {
          return new ServiceResponse<Category>(StatusCodes.Status404NotFound, Message: $"Category with id {id} not Found");
        }

        category.Name = request.Name;
        category.Emoji = request.Emoji;
        await dataContext.SaveChangesAsync();

        return new ServiceResponse<Category>(StatusCodes.Status200OK, data: category, Message: "Category Updated!");
      }
      catch (Exception)
      {
        return new ServiceResponse<Category>(StatusCodes.Status500InternalServerError);
      }
    }

    public async Task<ServiceResponse<Object>> DeleteCategory(Guid id)
    {
      try
      {
        /*
        if (id < 1)
        {
          return GetCategoryServiceResponse<Object>(StatusCodes.Status400BadRequest, msg: $"id {id} is not valid, please use a positive integer value");
        }
        */

        var category = await dataContext.Categories.FindAsync(id);
        if (category is null)
        {
          return new ServiceResponse<object>(StatusCodes.Status404NotFound, Message: $"Category with id {id} not Found");
        }

        var locationsWhereCategoryIsUsed = dataContext.Entry(category).Collection(c => c.Locations).Query().AsEnumerable().ToList();
        if (locationsWhereCategoryIsUsed.Count() > 0)
        {
          return new ServiceResponse<object>(StatusCodes.Status409Conflict, data: locationsWhereCategoryIsUsed, Message: $"This category is being used in {locationsWhereCategoryIsUsed.Count()} locations");
        }

        dataContext.Categories.Remove(category);
        await dataContext.SaveChangesAsync();

        return new ServiceResponse<object>(StatusCodes.Status204NoContent, Message: $"Category {category.Name} Deleted!");
      }
      catch (Exception)
      {
        return new ServiceResponse<object>(StatusCodes.Status500InternalServerError);
      }
    }
  }
}
