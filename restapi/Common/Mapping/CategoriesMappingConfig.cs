using Mapster;
using restapi.Dtos.Categories;
using restapi.Services.Categories.Commands.Common;
using restapi.Services.Categories.Commands.Create;

namespace restapi.Common.Mapping;

public class CategoriesMappingConfig : IRegister
{
  public void Register(TypeAdapterConfig config)
  {
    config.NewConfig<CategoryResult, CategoryResponse>()
          .Map(dest => dest, src => src.Category);

    config.NewConfig<CreateCategoryRequest, CreateCategoryCommand>();
  }
}