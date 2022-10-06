using restapi.Contracts.Categories;
using restapi.Models;
using restapi.Services.Categories.Commands.Create;
using restapi.Services.Categories.Commands.Delete;
using restapi.Services.Categories.Commands.Update;
using restapi.Services.Categories.Common;
using restapi.Services.Categories.Queries.GetCategories;
using restapi.Services.Categories.Queries.GetCategoryById;

namespace restapi.Common.Services.Mappers.Categories;

public interface ICategoryMapper
{
  CreateCategoryCommand MapCreateRequestToCommand(CreateCategoryRequest request, string userId);
  UpdateCategoryCommand MapUpdateRequestToCommand(Guid id, UpdateCategoryRequest request, string userId);
  GetCategoriesQuery MapGetCategoriesQueryToCommand();
  GetCategoryByIdQuery MapGetByIdQueryToCommand(Guid id);
  DeleteCategoryCommand MapDeleteCategoryRequestToCommand(Guid id);
  CategoryResponse MapResultToResponse(CategoryResult result);
  List<CategoryResponse> MapResultListToResponseList(List<CategoryResult> resultList);
  List<CategoryResponse> MapDbListToResponseList(List<Category> categories);
}