using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<ServiceResponse<List<Category>>>> GetAllCategories()
        {
            var response = await categoryService.GetAllCategories();
            return StatusCode(response.StatusCode, response);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ServiceResponse<List<Category>>>> GetCategory(int id)
        {
            var response = await categoryService.GetCategory(id);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<CategoryDto>>> AddCategory(CategoryDto category)
        {
            var response = await categoryService.AddCategory(category);
            return StatusCode(response.StatusCode, response);
        }


        [HttpPut]
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Category>>> UpdateCategory(Category request)
        {
            var response = await categoryService.UpdateCategory(request);
            return StatusCode(response.StatusCode, response);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ServiceResponse<CategoryService>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Category>>> DeleteCategory(int id)
        {
            var response = await categoryService.DeleteCategory(id);
            return StatusCode(response.StatusCode, response);
        }
    }
}
