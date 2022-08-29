using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace restapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private static List<Category> categories = new List<Category>
            {
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
            };

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(categories); 
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> Get(int id)
        {
            var category = categories.Find(x => x.Id == id);
            if (category == null) 
                return NotFound();

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<List<Category>>> AddCategory(Category category)
        {
            categories.Add(category);
            return Ok(categories);
        }

        [HttpPut]
        public async Task<ActionResult<List<Category>>> UpdateCategory(Category request)
        {
            var category = categories.Find(x => x.Id == request.Id);
            if (category == null)
                return NotFound();

            category.Name = request.Name;
            category.Emoji = request.Emoji;

            
            return Ok(categories);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Category>>> DeleteCategory(int id){
            var category = categories.Find(x => x.Id == id);
            if (category == null)
                return NotFound("Categoy not found");
            
            categories.Remove(category);
            return Ok(categories);
        }

    }
}
