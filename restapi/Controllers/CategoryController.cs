using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Contracts.Categories;
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
    var getCategoriesQuery = new GetCategoriesQuery();

    ErrorOr<List<CategoryResult>> getCategoriesQueryResult = await mediator.Send(getCategoriesQuery);

    return getCategoriesQueryResult.Match(
      result => Ok(MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [HttpGet("{id:guid}")]
  public async Task<IActionResult> GetCategoryById(Guid id)
  {
    ErrorOr<CategoryResult> getCategoryResult = await mediator.Send(new GetCategoryQuery(id));

    return getCategoryResult.Match(
      result => Ok(MapResultToResponse(result)),
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
      result => CreatedAtGetCategory(result),
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

  private static List<CategoryResponse> MapResultListToResponseList(List<CategoryResult> resultList)
  {
    var mappedList = new List<CategoryResponse>();

    foreach (CategoryResult result in resultList)
    {
      mappedList.Add(MapResultToResponse(result));
    }

    return mappedList;
  }

  private CreatedAtActionResult CreatedAtGetCategory(CategoryResult result)
  {
    return CreatedAtAction(
        actionName: nameof(GetCategoryById),
        routeValues: new { id = result.Category.Id },
        value: MapResultToResponse(result)
      );
  }
}
