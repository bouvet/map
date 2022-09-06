using restapi.Dtos.Location;
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

    [HttpPost(nameof(UploadFile))]
    public async Task<IActionResult> UploadFile(IFormFile files)
    {

      var azureKeyVault = Environment.GetEnvironmentVariable("VaultUri");
      var keyVaultEndpoint = new Uri(azureKeyVault);

      var client = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());


      string systemFileName = files.FileName;
      var blobstorageconnection = await client.GetSecretAsync("azureBlobStorageConnectionString");

      // Retrieve storage account from connection string.    
      CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(blobstorageconnection.Value.Value);
      // Create the blob client.    
      CloudBlobClient blobClient = cloudStorageAccount.CreateCloudBlobClient();
      // Retrieve a reference to a container.    
      CloudBlobContainer container = blobClient.GetContainerReference("images");
      // This also does not make a service call; it only creates a local object.    
      CloudBlockBlob blockBlob = container.GetBlockBlobReference(systemFileName);
      await using (var data = files.OpenReadStream())
      {
        await blockBlob.UploadFromStreamAsync(data);
      }

      ServiceResponse<object> response = new ServiceResponse<object> { };
      response.Data = blockBlob;
      return StatusCode(200, response);
    }



  }
}