using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace restapi.Swagger
{
  public class ListCategoryExample200OK : IExamplesProvider<ServiceResponse<List<Category>>>
  {
    public ServiceResponse<List<Category>> GetExamples()
    {
      return new ServiceResponse<List<Category>>
      {
        Data = new List<Category> {
                    new Category
                    {
                        Id = new Guid(),
                        Name = "Fotball",
                        Emoji = "⚽"
                    },
                    new Category
                    {
                        Id = new Guid(),
                        Name = "Tennis",
                        Emoji = "🎾"
                    }
                },
        StatusCode = StatusCodes.Status200OK,
        Success = true,
        Message = "",
      };
    }
  }
}