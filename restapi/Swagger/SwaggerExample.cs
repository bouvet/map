using restapi.Models;
using Swashbuckle.AspNetCore.Filters;

namespace restapi
{
    public class SwaggerExampleCategory : IExamplesProvider<ServiceResponse<Category>>
    {
        public ServiceResponse<Category> GetExamples()
        {
            return new ServiceResponse<Category>
            {
                Data = new Category
                {
                    Id = 1,
                    Name = "Fotball",
                    Emoji = "⚽"
                },
                StatusCode = 200,
                Success = true,
                Message = "",
            };
        }
    }

    public class SwaggerExampleListCategory : IExamplesProvider<ServiceResponse<List<Category>>>
    {
        public ServiceResponse<List<Category>> GetExamples()
        {
            return new ServiceResponse<List<Category>>
            {
                Data = new List<Category> {
                    new Category
                    {
                        Id = 1,
                        Name = "Fotball",
                        Emoji = "⚽"
                    },
                    new Category
                    {
                        Id = 2,
                        Name = "Tennis",
                        Emoji = "🎾"
                    }
                },
                StatusCode = 200,
                Success = true,
                Message = "",
            };
        }
    }

    public class SwaggerExampleListCategory404 : IExamplesProvider<ServiceResponse<List<Category>>>
    {
        public ServiceResponse<List<Category>> GetExamples()
        {
            return new ServiceResponse<List<Category>>
                {
                    Data = null,
                    StatusCode = 404,
                    Success = false,
                    Message = "Category with id 1 not Found",
                };
        }
    }

    public class SwaggerExampleListCategory500 : IExamplesProvider<ServiceResponse<List<Category>>>
    {
        public ServiceResponse<List<Category>> GetExamples()
        {
            return new ServiceResponse<List<Category>>
            {
                Data = null,
                StatusCode = 500,
                Success = false,
                Message = "Ops, something went wrong!",
            };
        }
    }

}
