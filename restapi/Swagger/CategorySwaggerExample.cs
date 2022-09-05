﻿using restapi.Models;
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
  public class SwaggerExampleCategory201 : IExamplesProvider<ServiceResponse<Category>>
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
        StatusCode = 201,
        Success = true,
        Message = "Category added!",
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

  public class SwaggerExampleListCategory400 : IExamplesProvider<ServiceResponse<List<Category>>>
  {
    public ServiceResponse<List<Category>> GetExamples()
    {
      return new ServiceResponse<List<Category>>
      {
        Data = null,
        StatusCode = 400,
        Success = false,
        Message = "id -1 is not valid, please use a positive integer value",
      };
    }
  }

  public class SwaggerExampleListCategory409Delete : IExamplesProvider<ServiceResponse<List<Location>>>
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
        StatusCode = 409,
        Success = false,
        Message = "This category is being used in 1 locations",
      };
    }
  }
  public class SwaggerExampleListCategory409Post : IExamplesProvider<ServiceResponse<List<Category>>>
  {
    public ServiceResponse<List<Category>> GetExamples()
    {
      return new ServiceResponse<List<Category>>
      {
        Data = null,
        StatusCode = 409,
        Success = false,
        Message = "Category with name Fotball already exist as [id: 13, name: Fotball, emoji: ⚽]",
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