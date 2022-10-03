using restapi.Contracts.Categories;
using restapi.Services.Categories.Commands.Create;
using restapi.Services.Categories.Commands.Delete;
using restapi.Services.Categories.Commands.Update;
using restapi.Services.Categories.Common;
using restapi.Services.Categories.Queries.GetCategories;
using restapi.Services.Categories.Queries.GetCategoryById;

namespace restapi.Common.Services.Mappers.Categories;

public interface ICategoryMapper
{
  CreateCategoryCommand MapCreateRequestToCommand(CreateCategoryRequest request);
  UpdateCategoryCommand MapUpdateRequestToCommand(Guid id, UpdateCategoryRequest request);
  GetCategoriesQuery MapGetCategoriesQueryToCommand();
  GetCategoryByIdQuery MapGetByIdQueryToCommand(Guid id);
  DeleteCategoryCommand MapDeleteCategoryRequestToCommand(Guid id);
  CategoryResponse MapResultToResponse(CategoryResult result);
  List<CategoryResponse> MapResultListToResponseList(List<CategoryResult> resultList);
}