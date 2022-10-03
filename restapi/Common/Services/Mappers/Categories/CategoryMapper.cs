using restapi.Contracts.Categories;
using restapi.Services.Categories.Commands.Create;
using restapi.Services.Categories.Commands.Delete;
using restapi.Services.Categories.Commands.Update;
using restapi.Services.Categories.Common;
using restapi.Services.Categories.Queries.GetCategories;
using restapi.Services.Categories.Queries.GetCategoryById;

namespace restapi.Common.Services.Mappers.Categories;

public class CategoryMapper : ICategoryMapper
{
  public CreateCategoryCommand MapCreateRequestToCommand(CreateCategoryRequest request)
  {
    return new CreateCategoryCommand(
      request.Name,
      request.Emoji
    );
  }

  public DeleteCategoryCommand MapDeleteCategoryRequestToCommand(Guid id)
  {
    return new DeleteCategoryCommand(id);
  }

  public GetCategoryByIdQuery MapGetByIdQueryToCommand(Guid id)
  {
    return new GetCategoryByIdQuery(id);
  }

  public GetCategoriesQuery MapGetCategoriesQueryToCommand()
  {
    return new GetCategoriesQuery();
  }

  public List<CategoryResponse> MapResultListToResponseList(List<CategoryResult> resultList)
  {
    var responseList = new List<CategoryResponse>();

    foreach (CategoryResult result in resultList)
    {
      responseList.Add(MapResultToResponse(result));
    }

    return responseList;
  }

  public CategoryResponse MapResultToResponse(CategoryResult result)
  {
    return new CategoryResponse(
      result.Category.Id,
      result.Category.Name,
      result.Category.Emoji
    );
  }

  public UpdateCategoryCommand MapUpdateRequestToCommand(Guid id, UpdateCategoryRequest request)
  {
    return new UpdateCategoryCommand(id, request.Name, request.Emoji);
  }
}
