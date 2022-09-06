using Azure;
using Microsoft.AspNetCore.Mvc;
using restapi.Services;
using restapi.Swagger;

namespace restapi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ErrorController : ControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<ServiceResponse<Object>>> GetError()
    {
      var response = new ServiceResponse<Object> { };
      return StatusCode(response.StatusCode, response);
    }
    
    [HttpGet("{payload}")]
    public async Task<ActionResult<ServiceResponse<Object>>> GetErrorPayload()
    {
      var response = new ServiceResponse<Object> { };
      return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<Object>>> GetErrorPost()
    {
      var response = new ServiceResponse<Object> { };
      return StatusCode(response.StatusCode, response);
    }

    [HttpPut]
    public async Task<ActionResult<ServiceResponse<Object>>> GetErrorPut()
    {
      var response = new ServiceResponse<Object> { };
      return StatusCode(response.StatusCode, response);
    }
    [HttpDelete]
    public async Task<ActionResult<ServiceResponse<Object>>> GetErrorDelete()
    {
      var response = new ServiceResponse<Object> { };
      return StatusCode(response.StatusCode, response);
    }
  }
}