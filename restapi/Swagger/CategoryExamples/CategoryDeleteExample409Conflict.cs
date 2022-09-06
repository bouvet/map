using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace restapi.Swagger
{
  public class CategoryDeleteExample409Conflict : IExamplesProvider<ServiceResponse<List<Location>>>
  {
    public ServiceResponse<List<Location>> GetExamples()
    {
      return new ServiceResponse<List<Location>>
      {
        Data = new List<Location> {
                    new Location
                    {
                        Id = 1,
                        Title = "park",
                        Description = "park description",
                        Img = "example.com",
                        Rating = 5,
                        Longitude = 5.7,
                        Latitude = 59.8,
                        Categories = new List<Category> {
                                new Category
                                {
                                    Id = 1,
                                    Name = "Fotball",
                                    Emoji = "⚽"
                                }
                        },
                    }
                },
        StatusCode = StatusCodes.Status409Conflict,
        Success = false,
        Message = "This category is being used in 1 locations",
      };
    }
  }
}