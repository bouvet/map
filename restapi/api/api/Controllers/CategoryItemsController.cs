using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryItemsController : ControllerBase
    {
        private readonly CategoryContext _context;

        public CategoryItemsController(CategoryContext context)
        {
            _context = context;
        }

        // GET: api/CategoryItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryItem>>> GetCategoryItems()
        {
          if (_context.CategoryItems == null)
          {
              return NotFound();
          }
            return await _context.CategoryItems.ToListAsync();
        }

        // GET: api/CategoryItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryItem>> GetCategoryItem(long id)
        {
          if (_context.CategoryItems == null)
          {
              return NotFound();
          }
            var categoryItem = await _context.CategoryItems.FindAsync(id);

            if (categoryItem == null)
            {
                return NotFound();
            }

            return categoryItem;
        }

        // PUT: api/CategoryItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoryItem(long id, CategoryItem categoryItem)
        {
            if (id != categoryItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(categoryItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CategoryItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CategoryItem>> PostCategoryItem(CategoryItem categoryItem)
        {
          if (_context.CategoryItems == null)
          {
              return Problem("Entity set 'CategoryContext.CategoryItems'  is null.");
          }
            _context.CategoryItems.Add(categoryItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategoryItem", new { id = categoryItem.Id }, categoryItem);
        }

        // DELETE: api/CategoryItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoryItem(long id)
        {
            if (_context.CategoryItems == null)
            {
                return NotFound();
            }
            var categoryItem = await _context.CategoryItems.FindAsync(id);
            if (categoryItem == null)
            {
                return NotFound();
            }

            _context.CategoryItems.Remove(categoryItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryItemExists(long id)
        {
            return (_context.CategoryItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
