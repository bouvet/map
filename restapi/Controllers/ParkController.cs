using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace restapi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ParkController : ControllerBase
  {

    private readonly DataContext context;

    public ParkController(DataContext context)
    {
      this.context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ParkDto>>> GetPark()
    {

      return Ok(await context.Parks.ToListAsync());
    }

    // GET: api/LocationItems/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ParkDto>> GetSinglePark(int id)
    {

      var park = await context.Parks.FindAsync(id);

      if (park == null)
      {
        return NotFound("Park not found");
      }

      return Ok(park);

    }

    // PUT: api/LocationItems/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut()]
    public async Task<ActionResult<List<ParkDto>>> UpdatePark(Park request)
    {
      var park = await context.Parks.FindAsync(request.Id);

      if (park == null)
      {
        return NotFound("Park not found");
      }

      park.Name = request.Name;
      park.Description = request.Description;
      park.Latitude = request.Latitude;
      park.Longitude = request.Longitude;

      await context.SaveChangesAsync();

      return Ok(await context.Parks.ToListAsync());

    }

    // POST: api/LocationItems
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ParkDto>> AddPark(Park newPark)
    {
      context.Parks.Add(newPark);
      await context.SaveChangesAsync();

      return Ok(await context.Parks.ToListAsync());
    }

    // DELETE: api/LocationItems/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<List<Park>>> DeletePark(int id)
    {
      var park = await context.Parks.FindAsync(id);

      if (park == null)
      {
        return NotFound("Park not found");
      }

      context.Parks.Remove(park);

      await context.SaveChangesAsync();

      return Ok(await context.Parks.ToListAsync());

    }

  }
}
