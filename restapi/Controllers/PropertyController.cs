namespace restapi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Produces(MediaTypeNames.Application.Json)]
  [Consumes(MediaTypeNames.Application.Json)]
  public class PropertyController : ControllerBase
  {
    private readonly PropertyService propertyService;

    public PropertyController(PropertyService propertyService)
    {
      this.propertyService = propertyService;
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<Property>>>> GetAllProperties()
    {
      var response = await propertyService.GetAllProperties();
      return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<Property>>> GetPropertyById(int id)
    {
      var response = await propertyService.GetPropertyById(id);
      if (response.Success is true)
      {
        return Ok(response);
      }
      else
      {
        return NotFound(response);
      }
    }

  }
}