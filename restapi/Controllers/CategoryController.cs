using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Filters;

namespace restapi.Controllers
{
  // [Route("api/[controller]")]
  [Route("api/Categories")]
  [ApiController]
  public class CategoryController : ControllerBase
  {
    private readonly ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService)
    {
      this.categoryService = categoryService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SwaggerExampleListCategory500), StatusCodes.Status500InternalServerError)]
    [SwaggerResponseExample(StatusCodes.Status200OK, typeof(SwaggerExampleListCategory))]
    [SwaggerResponseExample(StatusCodes.Status500InternalServerError, typeof(SwaggerExampleListCategory500))]
    public async Task<ActionResult<ServiceResponse<List<Category>>>> GetAllCategories()
    {
      var response = await categoryService.GetAllCategories();
      return StatusCode(response.StatusCode, response);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [SwaggerResponseExample(StatusCodes.Status200OK, typeof(SwaggerExampleCategory))]
    [SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(SwaggerExampleListCategory404))]
    [SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(SwaggerExampleListCategory400))]
    public async Task<ActionResult<ServiceResponse<Category>>> GetCategory(int id)
    {
      var response = await categoryService.GetCategory(id);
      return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(SwaggerExampleListCategory500), StatusCodes.Status500InternalServerError)]
    [SwaggerResponseExample(StatusCodes.Status201Created, typeof(SwaggerExampleCategory201))]
    [SwaggerResponseExample(StatusCodes.Status500InternalServerError, typeof(SwaggerExampleListCategory500))]
    [SwaggerResponseExample(StatusCodes.Status409Conflict, typeof(SwaggerExampleListCategory409Post))]
    public async Task<ActionResult<ServiceResponse<List<Category>>>> AddCategory(CategoryDto category)
    {
      var response = await categoryService.AddCategory(category);
      return StatusCode(response.StatusCode, response);
    }


    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [SwaggerResponseExample(StatusCodes.Status200OK, typeof(SwaggerExampleCategory))]
    [SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(SwaggerExampleListCategory404))]
    [SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(SwaggerExampleListCategory400))]
    public async Task<ActionResult<ServiceResponse<List<Category>>>> UpdateCategory(int id, CategoryDto request)
    {
      var response = await categoryService.UpdateCategory(id, request);
      return StatusCode(response.StatusCode, response);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(SwaggerExampleListCategory404))]
    [SwaggerResponseExample(StatusCodes.Status409Conflict, typeof(SwaggerExampleListCategory409Delete))]
    [SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(SwaggerExampleListCategory400))]
    public async Task<ActionResult<ServiceResponse<Object>>> DeleteCategory(int id)
    {
      var response = await categoryService.DeleteCategory(id);
      if (response.StatusCode == StatusCodes.Status204NoContent)
        return StatusCode(response.StatusCode);
      return StatusCode(response.StatusCode, response);
    }
  }
}
