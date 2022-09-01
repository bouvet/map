namespace restapi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class LocationController : ControllerBase
  {
    private readonly ILocationService locationService;

    public LocationController(ILocationService locationService)
    {
      this.locationService = locationService;
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<LocationResponseDto>>>> GetAllLocations()
    {
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var response = await locationService.GetAllLocations();
      return Ok(response);
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ServiceResponse<LocationResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ServiceResponse<LocationService>), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> GetLocationById(int id)
    {
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var response = await locationService.GetLocationById(id);
      if (response.Success is true)
      {
        return Ok(response);
      }
      else
      {
        return NotFound(response);
      }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> AddLocation(AddLoctionDto newLocation)
    {
      var response = await locationService.AddLocation(newLocation);

      return StatusCode(response.StatusCode, response);

    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> UpdateLocation(int id, UpdateLocationDto updatedLocation)
    {
      var response = await locationService.UpdateLocation(id, updatedLocation);
      return StatusCode(response.StatusCode, response);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ServiceResponse<ServiceResponseDto>>> DeleteLocation(int id)
    {
      var response = await locationService.DeleteLocation(id);
      return StatusCode(response.StatusCode, response);
    }
  }
}
