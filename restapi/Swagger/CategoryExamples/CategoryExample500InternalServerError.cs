using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace restapi.Swagger
{
  public class CategoryExample500InternalServerError : IExamplesProvider<ServiceResponse<Category>>
  {
    public ServiceResponse<Category> GetExamples()
    {
      return new ServiceResponse<Category>
      {
        Data = null,
        StatusCode = StatusCodes.Status500InternalServerError,
        Success = false,
        Message = "Ops, something went wrong!",
      };
    }
  }
}