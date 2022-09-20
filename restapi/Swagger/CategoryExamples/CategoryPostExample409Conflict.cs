using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VerdenVenter.Swagger
{
  public class CategoryPostExample409Conflict : IExamplesProvider<ServiceResponse<List<Category>>>
  {
    public ServiceResponse<List<Category>> GetExamples()
    {
      return new ServiceResponse<List<Category>>
      {
        Data = null,
        StatusCode = StatusCodes.Status409Conflict,
        Success = false,
        Message = "Category with name Fotball already exist as [id: 13, name: Fotball, emoji: ⚽]",
      };
    }
  }
}