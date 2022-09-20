using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VerdenVenter.Swagger
{
  public class CategoryExample400BadRequest : IExamplesProvider<ServiceResponse<Category>>
  {
    public ServiceResponse<Category> GetExamples()
    {
      return new ServiceResponse<Category>
      {
        Data = null,
        StatusCode = StatusCodes.Status400BadRequest,
        Success = false,
        Message = "id -1 is not valid, please use a positive integer value",
      };
    }
  }
}