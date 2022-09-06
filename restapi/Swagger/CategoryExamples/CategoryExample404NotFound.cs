using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace restapi.Swagger
{
  public class CategoryExample404NotFound : IExamplesProvider<ServiceResponse<List<Category>>>
  {
    public ServiceResponse<List<Category>> GetExamples()
    {
      return new ServiceResponse<List<Category>>
      {
        Data = null,
        StatusCode = StatusCodes.Status404NotFound,
        Success = false,
        Message = "Category with id 1 not Found",
      };
    }
  }
}