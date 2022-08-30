using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Filters;

namespace restapi.Controllers
{
    [Route("api/[controller]")]
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
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(SwaggerExampleCategory))]
        [SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(SwaggerExampleListCategory404))]
        public async Task<ActionResult<ServiceResponse<Category>>> GetCategory(int id)
        {
            var response = await categoryService.GetCategory(id);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SwaggerExampleListCategory500), StatusCodes.Status500InternalServerError)]
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(SwaggerExampleListCategory))]
        [SwaggerResponseExample(StatusCodes.Status500InternalServerError, typeof(SwaggerExampleListCategory500))]
        public async Task<ActionResult<ServiceResponse<List<Category>>>> AddCategory(CategoryDto category)
        {
            var response = await categoryService.AddCategory(category);
            return StatusCode(response.StatusCode, response);
        }


        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(SwaggerExampleListCategory))]
        [SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(SwaggerExampleListCategory404))]
        public async Task<ActionResult<ServiceResponse<List<Category>>>> UpdateCategory(Category request)
        {
            var response = await categoryService.UpdateCategory(request);
            return StatusCode(response.StatusCode, response);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(SwaggerExampleListCategory))]
        [SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(SwaggerExampleListCategory404))]
        public async Task<ActionResult<ServiceResponse<List<Category>>>> DeleteCategory(int id)
        {
            var response = await categoryService.DeleteCategory(id);
            return StatusCode(response.StatusCode, response);
        }
    }
}
