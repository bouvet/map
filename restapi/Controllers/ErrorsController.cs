using Microsoft.AspNetCore.Mvc;

namespace restapi.Controllers;

public class ErrorsController : ControllerBase
{
  [Route("/error")]
  public IActionResult Error()
  {
    return Problem();
  }
}