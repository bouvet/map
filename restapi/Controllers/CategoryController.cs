using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace restapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly DataContext _context;
        public CategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.Categories.ToListAsync()); 
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> Get(int id)
        {
            //var category = categories.Find(x => x.Id == id);
            var category = await _context.Categories.FindAsync(id);
            if (category == null) 
                return NotFound();

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<List<Category>>> AddCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return Ok(await _context.Categories.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Category>>> UpdateCategory(Category request)
        {
            var category = await _context.Categories.FindAsync(request.Id);
            if (category == null)
                return NotFound();

            category.Name = request.Name;
            category.Emoji = request.Emoji;

            await _context.SaveChangesAsync();
            
            return Ok(await _context.Categories.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Category>>> DeleteCategory(int id){
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return Ok(await _context.Categories.ToListAsync());
        }

    }
}
