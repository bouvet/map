using ErrorOr;

namespace restapi.Controllers
{
  public class UsersController : ApiController
  {
    private readonly UserService userService;

    public UsersController(UserService userService)
    {
      this.userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> AddUser(AddUserDto newUser)
    {
      ErrorOr<User> addUserResult = await userService.AddUser(newUser);

      return addUserResult.Match(
        user => CreatedAtGetUser(user),
        errors => Problem(errors)
      );
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      ErrorOr<List<User>> getUsersResult = await userService.GetUsers();

      return getUsersResult.Match(
        users => Ok(users),
        errors => Problem(errors)
      );
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetUser(Guid id)
    {
      ErrorOr<User> getUserResult = await userService.GetUser(id);

      return getUserResult.Match(
        user => Ok(user),
        errors => Problem(errors)
      );
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateUser(Guid id, UpdateUserDto updatedUser)
    {
      ErrorOr<Updated> updateUserResult = await userService.UpdateUser(id, updatedUser);

      return updateUserResult.Match(
        _ => NoContent(),
        errors => Problem(errors)
      );
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
      ErrorOr<Deleted> deleteUserResult = await userService.DeleteUser(id);

      return deleteUserResult.Match(
        _ => NoContent(),
        errors => Problem(errors)
      );
    }

    private CreatedAtActionResult CreatedAtGetUser(User user)
    {
      return CreatedAtAction(
          actionName: nameof(GetUser),
          routeValues: new { id = user.Id },
          value: user
        );
    }
  }
}