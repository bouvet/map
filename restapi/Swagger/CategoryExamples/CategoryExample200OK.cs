using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace restapi.Swagger
{
  public class CategoryExample200OK : IExamplesProvider<ServiceResponse<Category>>
  {
    public ServiceResponse<Category> GetExamples()
    {
      return new ServiceResponse<Category>
      {
        Data = new Category
        {
          Id = new Guid(),
          Name = "Fotball",
          Emoji = "⚽"
        },
        StatusCode = StatusCodes.Status200OK,
        Success = true,
        Message = "",
      };
    }
  }
}