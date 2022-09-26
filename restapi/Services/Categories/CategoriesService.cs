using ErrorOr;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Dtos.Categories;
using restapi.Models;
using restapi.ServiceUtils.ServiceErrors;

namespace restapi.Services.Categories;

public class CategoryService : ICategoryService
{
  private readonly DataContext dataContext;

  public CategoryService(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<List<Category>>> GetCategoriesInUse()
  {
    var allCategories = await dataContext.Categories.ToListAsync();
    var locations = await dataContext.Locations.ToListAsync();

    return allCategories.Where(cat => locations.Exists(loc => loc.Categories.Exists(locCat => locCat.Id == cat.Id))).ToList();
  }
  public async Task<ErrorOr<List<Category>>> GetCategories()
  {
    return await dataContext.Categories.ToListAsync();
  }

  public async Task<ErrorOr<Category>> GetCategory(Guid id)
  {
    var category = await dataContext.Categories.FindAsync(id);

    if (category is null)
    {
      return Errors.Category.NotFound;
    }

    return category;
  }

  public async Task<ErrorOr<Category>> CreateCategory(CategoryDto request)
  {
    List<Error> errors = new();

    List<Category> existingCategoryWithSameName = dataContext.Categories.Where(c => c.Name == request.Name).ToList();

    if (existingCategoryWithSameName.Count > 0)
    {
      errors.Add(Errors.Category.AlreadyExists);
    }

    if (request.Name.Length is < Category.MinNameLength or > Category.MaxNameLength)
    {
      errors.Add(Errors.Category.InvalidName);
    }

    if (string.IsNullOrEmpty(request.Emoji))
    {
      errors.Add(Errors.Category.InvalidEmoji);
    }

    if (errors.Count > 0)
    {
      return errors;
    }

    var category = new Category { Name = request.Name, Emoji = request.Emoji };

    dataContext.Categories.Add(category);
    await dataContext.SaveChangesAsync();

    return category;
  }

  public async Task<ErrorOr<Updated>> UpdateCategory(Guid id, CategoryDto request)
  {
    List<Error> errors = new();

    var category = await dataContext.Categories.FindAsync(id);

    if (category == null)
    {
      return Errors.Category.NotFound;
    }

    if (request.Name.Length is < Category.MinNameLength or > Category.MaxNameLength)
    {
      errors.Add(Errors.Category.InvalidName);
    }

    if (string.IsNullOrEmpty(request.Emoji))
    {
      errors.Add(Errors.Category.InvalidEmoji);
    }

    if (errors.Count > 0)
    {
      return errors;
    }

    category.Name = request.Name;
    category.Emoji = request.Emoji;

    await dataContext.SaveChangesAsync();

    return Result.Updated;
  }
}

