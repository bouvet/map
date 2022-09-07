using System.Net.Http;

using Azure.Storage.Blobs;
using Microsoft.WindowsAzure.Storage;
using Azure.Security.KeyVault.Secrets;
using Azure.Identity;
using Microsoft.WindowsAzure.Storage.Blob;
namespace restapi.Controllers
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


    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> GetLocationById(Guid id)
    {
      var response = await locationService.GetLocationById(id);
      return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> AddLocation(AddLoctionDto newLocation)
    {
      var response = await locationService.AddLocation(newLocation);
      if (response.StatusCode == StatusCodes.Status201Created)
      {
        return CreatedAtAction(nameof(GetLocationById), new { id = response.Data!.Id }, response);
      }
      return StatusCode(response.StatusCode, response);

    }

    [HttpPost("UploadFile")]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> AddLocationWithImage([FromForm] AddLoctionDto newLocation)
    {
      var response = await locationService.AddLocation(newLocation);
      if (response.StatusCode == StatusCodes.Status201Created)
      {
        return CreatedAtAction(nameof(GetLocationById), new { id = response.Data!.Id }, response);
      }
      return StatusCode(response.StatusCode, response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ServiceResponse<LocationResponseDto>>> UpdateLocation(Guid id, UpdateLocationDto updatedLocation)
    {
      var response = await locationService.UpdateLocation(id, updatedLocation);
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

    // [HttpPost("{id}/" + nameof(UploadFile))]
    // public async Task<IActionResult> UploadFile(Guid id, IFormFile files)
    // {
    //   CloudBlockBlob response = await BlobService.UploadFile(id, files);
    //   return Ok(response.Uri.ToString());

    // }



  }
}