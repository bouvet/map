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
    public class LocationItemsController : ControllerBase
    {
        private readonly LocationContext _context;

        public LocationItemsController(LocationContext context)
        {
            _context = context;
        }

        // GET: api/LocationItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationItem>>> GetLocationItems()
        {
          if (_context.LocationItems == null)
          {
              return NotFound();
          }
            return await _context.LocationItems.ToListAsync();
        }

        // GET: api/LocationItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LocationItem>> GetLocationItem(long id)
        {
          if (_context.LocationItems == null)
          {
              return NotFound();
          }
            var locationItem = await _context.LocationItems.FindAsync(id);

            if (locationItem == null)
            {
                return NotFound();
            }

            return locationItem;
        }

        // PUT: api/LocationItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocationItem(long id, LocationItem locationItem)
        {
            if (id != locationItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(locationItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationItemExists(id))
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

        // POST: api/LocationItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LocationItem>> PostLocationItem(LocationItem locationItem)
        {
          if (_context.LocationItems == null)
          {
              return Problem("Entity set 'LocationContext.LocationItems'  is null.");
          }
            _context.LocationItems.Add(locationItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocationItem", new { id = locationItem.Id }, locationItem);
        }

        // DELETE: api/LocationItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocationItem(long id)
        {
            if (_context.LocationItems == null)
            {
                return NotFound();
            }
            var locationItem = await _context.LocationItems.FindAsync(id);
            if (locationItem == null)
            {
                return NotFound();
            }

            _context.LocationItems.Remove(locationItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocationItemExists(long id)
        {
            return (_context.LocationItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
