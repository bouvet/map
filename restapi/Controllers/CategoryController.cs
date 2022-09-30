using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Contracts.Categories;
using restapi.Models;
using restapi.Services.Categories.Commands.Create;
using restapi.Services.Categories.Commands.Delete;
using restapi.Services.Categories.Commands.Update;
using restapi.Services.Categories.Common;
using restapi.Services.Categories.Queries.GetCategories;
using restapi.Services.Categories.Queries.GetCategory;

namespace restapi.Controllers;

public class CategoriesController : ApiController
{
  private readonly ISender mediator;

  public CategoriesController(ISender mediator)
  {
    this.mediator = mediator;
  }

  [HttpGet]
  public async Task<IActionResult> GetCategories()
  {
    ErrorOr<List<Category>> getCategoriesResult = await mediator.Send(new GetCategoriesQuery());

    return getCategoriesResult.Match(
      categories => Ok(categories),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetCategory(Guid id)
  {
    ErrorOr<CategoryResult> getCategoryResult = await mediator.Send(new GetCategoryQuery(id));

    return getCategoryResult.Match(
      category => Ok(category),
      errors => Problem(errors)
    );
  }

  [HttpPost]
  public async Task<IActionResult> CreateCategory(CreateCategoryRequest request)
  {
    var createCategoryCommand = new CreateCategoryCommand(
      request.Name,
      request.Emoji
    );

    ErrorOr<CategoryResult> createCategoryResult = await mediator.Send(createCategoryCommand);

    return createCategoryResult.Match(
      category => CreatedAtGetCategory(category),
      errors => Problem(errors)
    );
  }

  [HttpPut("{id:guid}")]
  public async Task<IActionResult> UpdateCategory(Guid id, UpdateCategoryRequest request)
  {
    var updateCategoryCommand = new UpdateCategoryCommand(id, request.Name, request.Emoji);

    ErrorOr<Updated> updateCategoryResult = await mediator.Send(updateCategoryCommand);

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

  private static CategoryResponse MapResultToResponse(CategoryResult result)
  {
    return new CategoryResponse(
      result.Category.Id,
      result.Category.Name,
      result.Category.Emoji
    );
  }

  private CreatedAtActionResult CreatedAtGetCategory(CategoryResult result)
  {
    return CreatedAtAction(
        actionName: nameof(GetCategory),
        routeValues: new { id = result.Category.Id },
        value: MapResultToResponse(result)
      );
  }
}
