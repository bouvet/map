using ErrorOr;

namespace restapi.Controllers
{
  public class CategoriesController : ApiController
  {
    private readonly ICategoryService categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
      this.categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
      ErrorOr<List<Category>> getCategoriesResult = await categoryService.GetCategories();

      return getCategoriesResult.Match(
        categories => Ok(categories),
        errors => Problem(errors)
      );
    }

    [HttpGet("inUse")]
    public async Task<IActionResult> GetCategoriesInUse()
    {
      ErrorOr<List<Category>> getCategoriesInUseResult = await categoryService.GetCategoriesInUse();

      return getCategoriesInUseResult.Match(
        categories => Ok(categories),
        errors => Problem(errors)
      );
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetCategory(Guid id)
    {
      ErrorOr<Category> getCategoryResult = await categoryService.GetCategory(id);

      return getCategoryResult.Match(
        category => Ok(category),
        errors => Problem(errors)
      );
    }

    [HttpPost]
    public async Task<IActionResult> AddCategory(CategoryDto category)
    {
      ErrorOr<Category> createCategoryResult = await categoryService.AddCategory(category);

      return createCategoryResult.Match(
        category => CreatedAtGetCategory(category),
        errors => Problem(errors)
      );
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateCategory(Guid id, CategoryDto request)
    {
      ErrorOr<Updated> updateCategoryResult = await categoryService.UpdateCategory(id, request);

      return updateCategoryResult.Match(
        _ => NoContent(),
        errors => Problem(errors)
      );
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
      ErrorOr<Deleted> deleteCategoryResult = await categoryService.DeleteCategory(id);

      return deleteCategoryResult.Match(
        _ => NoContent(),
        errors => Problem(errors)
      );
    }

    private CreatedAtActionResult CreatedAtGetCategory(Category category)
    {
      return CreatedAtAction(
          actionName: nameof(GetCategory),
          routeValues: new { id = category.Id },
          value: category
        );
    }
  }
}
