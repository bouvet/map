using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

namespace restapi.Controllers
{
  [Route("api/[controller]")]
  [Produces(MediaTypeNames.Application.Json)]
  [Consumes(MediaTypeNames.Application.Json)]
  public class ParkController : ControllerBase
  {

    // private readonly DataContext context;
    private readonly IParkService parkService;

    public ParkController(IParkService parkService)
    {
      // this.context = context;
      this.parkService = parkService;
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<Park>>>> GetAllParks()
    {
      return Ok(await parkService.GetAllParks());
    }


    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ServiceResponse<Park>>> GetSinglePark(int id)
    {
      var response = await parkService.GetParkById(id);
      if (response.Success is true)
      {
        return Ok(response);
      }
      else
      {
        return NotFound(response);
      }
    }

    // // PUT: api/LocationItems/5
    // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // [HttpPut()]
    // public async Task<ActionResult<List<ParkDto>>> UpdatePark(Park request)
    // {
    //   var park = await context.Parks.FindAsync(request.Id);

    //   if (park == null)
    //   {
    //     return NotFound("Park not found");
    //   }

    //   park.Name = request.Name;
    //   park.Description = request.Description;
    //   park.Latitude = request.Latitude;
    //   park.Longitude = request.Longitude;

    //   await context.SaveChangesAsync();

    //   return Ok(await context.Parks.ToListAsync());

    // }

    // // POST: api/LocationItems
    // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // [HttpPost]
    // public async Task<ActionResult<Park>> AddPark(Park newPark)
    // {

    //   context.Parks.Add(newPark);
    //   await context.SaveChangesAsync();

    //   return Ok(await context.Parks.ToListAsync());
    // }

    // // DELETE: api/LocationItems/5
    // [HttpDelete("{id}")]
    // public async Task<ActionResult<List<Park>>> DeletePark(int id)
    // {
    //   var park = await context.Parks.FindAsync(id);

    //   if (park == null)
    //   {
    //     return NotFound("Park not found");
    //   }

    //   context.Parks.Remove(park);

    //   await context.SaveChangesAsync();

    //   return Ok(await context.Parks.ToListAsync());

    // }

  }
}
