using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VerdenVenter.Swagger
{
  public class CategoryExample201Created : IExamplesProvider<ServiceResponse<Category>>
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
        StatusCode = StatusCodes.Status201Created,
        Success = true,
        Message = "Category added!",
      };
    }
  }
}