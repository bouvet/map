using Mapster;
using restapi.Contracts.Categories;
using restapi.Services.Categories.Commands.Create;
using restapi.Services.Categories.Common;

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