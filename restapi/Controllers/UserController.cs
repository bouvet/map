namespace restapi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase
  {
    private readonly UserService userService;

    public UsersController(UserService userService)
    {
      this.userService = userService;
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<User>>> AddUser(AddUserDto newUser)
    {
      var response = await userService.AddUser(newUser);
      return StatusCode(response.StatusCode, response);
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<User>>>> GetUsers()
    {
      var response = await userService.GetUsers();
      return StatusCode(response.StatusCode, response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ServiceResponse<User>>> UpdateUser(Guid id, UpdateUserDto updatedUser)
    {
      var response = await userService.UpdateUser(id, updatedUser);
      return StatusCode(response.StatusCode, response);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<DeleteUserDto>>> DeleteUser(Guid id)
    {
      var response = await userService.DeleteUser(id);
      return StatusCode(response.StatusCode, response);
    }
  }
}