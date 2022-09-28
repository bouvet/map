using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using restapi.Contracts.Categories;
using restapi.Dtos.Categories;
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
  private readonly IMapper mapper;

  public CategoriesController(ISender mediator, IMapper mapper)
  {
    this.mediator = mediator;
    this.mapper = mapper;
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
