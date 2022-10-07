using restapi.Common.Services.Mappers.Users;
using restapi.Contracts.Categories;
using restapi.Models;
using restapi.Services.Categories.Commands.Create;
using restapi.Services.Categories.Commands.Delete;
using restapi.Services.Categories.Commands.Update;
using restapi.Services.Categories.Common;
using restapi.Services.Categories.Queries.GetCategories;
using restapi.Services.Categories.Queries.GetCategoryById;

namespace restapi.Common.Services.Mappers.Categories;

public class CategoryMapper : ICategoryMapper
{
  private readonly IUserMapper userMapper;

  public CategoryMapper(IUserMapper userMapper)
  {
    this.userMapper = userMapper;
  }

  public CreateCategoryCommand MapCreateRequestToCommand(CreateCategoryRequest request, string userId)
  {
    return new CreateCategoryCommand(
      request.Name,
      request.Emoji,
      string.IsNullOrEmpty(userId) ? null : Guid.Parse(userId)
    );
  }

  public List<CategoryResponse> MapDbListToResponseList(List<Category> categories)
  {
    var resultList = new List<CategoryResult>();

    foreach (Category category in categories)
    {
      resultList.Add(new CategoryResult(category));
    }

    return MapResultListToResponseList(resultList);
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
      result.Category.Emoji,
      result.Category.Creator is not null ? userMapper.MapUserToMinifiedUserResponse(result.Category.Creator) : null,
      result.Category.Editor is not null ? userMapper.MapUserToMinifiedUserResponse(result.Category.Editor) : null
    );
  }

  public UpdateCategoryCommand MapUpdateRequestToCommand(Guid id, UpdateCategoryRequest request, string userId)
  {
    return new UpdateCategoryCommand(
        id,
        request.Name,
        request.Emoji,
        string.IsNullOrEmpty(userId) ? null : Guid.Parse(userId)
      );
  }
}
