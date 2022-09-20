namespace VerdenVenter.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class LocationsController : ControllerBase
  {
    private readonly ILocationService locationService;

    public LocationsController(ILocationService locationService)
    {
      this.locationService = locationService;
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<LocationResponseDto>>>> GetAllLocations()
    {
      var response = await locationService.GetAllLocations();
      return StatusCode(response.StatusCode, response);
    }

    [HttpGet("{latitude}&{longitude}/category")]
    public async Task<ActionResult<ServiceResponse<List<LocationResponseDto>>>> GetClosestLocation(double latitude, double longitude, Guid category)
    {
      var response = await locationService.GetClosestLocation(latitude, longitude, category);
      return StatusCode(response.StatusCode, response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> GetLocationById(Guid id)
    {
      var response = await locationService.GetLocationById(id);
      return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> AddLocation([FromForm] AddLocationDto request)
    {
      var response = await locationService.AddLocation(request);
      if (response.StatusCode == StatusCodes.Status201Created)
      {
        return CreatedAtAction(nameof(GetLocationById), new { id = response.Data!.Id }, response);
      }
      return StatusCode(response.StatusCode, response);
    }

    [HttpPut]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> UpdateLocation([FromForm] UpdateLocationDto request)
    {
      var response = await locationService.UpdateLocation(request);
      return StatusCode(response.StatusCode, response);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<DeleteLocationDto>>> DeleteLocation(Guid id)
    {
      var response = await locationService.DeleteLocation(id);
      if (response.StatusCode == 204)
      {
        return StatusCode(response.StatusCode);
      }
      else
      {
        return StatusCode(response.StatusCode, response);
      }
    }
  }
}