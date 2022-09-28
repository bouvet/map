using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Dtos.Categories;
using restapi.Models;
using restapi.Services.Categories;
using restapi.Services.Categories.Commands.Create;
using restapi.Services.Categories.Commands.Delete;
using restapi.Services.Categories.Common;

namespace restapi.Controllers;

public class CategoriesController : ApiController
{
  private readonly ICategoryService categoryService;
  private readonly ISender mediator;
  private readonly IMapper mapper;

  public CategoriesController(ICategoryService categoryService, ISender mediator, IMapper mapper)
  {
    this.categoryService = categoryService;
    this.mediator = mediator;
    this.mapper = mapper;
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
  public async Task<IActionResult> CreateCategory(CategoryDto request)
  {
    var createCategoryCommand = mapper.Map<CreateCategoryCommand>(request);
    ErrorOr<CategoryResult> createCategoryResult = await mediator.Send(createCategoryCommand);

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
    var deleteCommand = new DeleteCategoryCommand(id);

    ErrorOr<Deleted> deleteCategoryResult = await mediator.Send(deleteCommand);

    return deleteCategoryResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private CreatedAtActionResult CreatedAtGetCategory(CategoryResult categoryResult)
  {
    CategoryResponse categoryResponse = mapper.Map<CategoryResponse>(categoryResult);

    return CreatedAtAction(
        actionName: nameof(GetCategory),
        routeValues: new { id = categoryResponse.Id },
        value: categoryResponse
      );
  }
}
