using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Services.Mappers.Categories;
using restapi.Contracts.Categories;
using restapi.Services.Categories.Common;

namespace restapi.Controllers;

public class CategoriesController : ApiController
{
  private readonly ISender mediator;
  private readonly ICategoryMapper categoryMapper;

  public CategoriesController(ISender mediator, ICategoryMapper categoryMapper)
  {
    this.mediator = mediator;
    this.categoryMapper = categoryMapper;
  }

  [HttpGet]
  public async Task<IActionResult> GetCategories()
  {
    var getCategoriesQuery = categoryMapper.MapGetCategoriesQueryToCommand();

    ErrorOr<List<CategoryResult>> getCategoriesQueryResult = await mediator.Send(getCategoriesQuery);

    return getCategoriesQueryResult.Match(
      result => Ok(categoryMapper.MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetCategoryById(Guid id)
  {
    var getCategoryByIdQuery = categoryMapper.MapGetByIdQueryToCommand(id);

    ErrorOr<CategoryResult> getCategoryByIdQueryResult = await mediator.Send(getCategoryByIdQuery);

    return getCategoryByIdQueryResult.Match(
      result => Ok(categoryMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "Administrator")]
  [HttpPost]
  public async Task<IActionResult> CreateCategory(CreateCategoryRequest request)
  {
    var userId = HttpContext.User.FindFirst("userId")?.Value;

    var createCategoryCommand = categoryMapper.MapCreateRequestToCommand(request, userId ?? "");

    ErrorOr<CategoryResult> createCategoryResult = await mediator.Send(createCategoryCommand);

    return createCategoryResult.Match(
      result => CreatedAtGetCategory(result),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "Administrator")]
  [HttpPut("{id:guid}")]
  public async Task<IActionResult> UpdateCategory(Guid id, UpdateCategoryRequest request)
  {
    var userId = HttpContext.User.FindFirst("userId")?.Value;

    var updateCategoryCommand = categoryMapper.MapUpdateRequestToCommand(id, request, userId ?? "");

    ErrorOr<Updated> updateCategoryResult = await mediator.Send(updateCategoryCommand);

    return updateCategoryResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "Administrator")]
  [HttpDelete("{id:guid}")]
  public async Task<IActionResult> DeleteCategory(Guid id)
  {
    var deleteCommand = categoryMapper.MapDeleteCategoryRequestToCommand(id);

    ErrorOr<Deleted> deleteCategoryResult = await mediator.Send(deleteCommand);

    return deleteCategoryResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }

  private CreatedAtActionResult CreatedAtGetCategory(CategoryResult result)
  {
    return CreatedAtAction(
        actionName: nameof(GetCategoryById),
        routeValues: new { id = result.Category.Id },
        value: categoryMapper.MapResultToResponse(result)
      );
  }
}
