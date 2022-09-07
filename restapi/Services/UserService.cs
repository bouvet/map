namespace restapi.Services
{
  public class UserService : IUserService
  {
    private readonly DataContext dataContext;

    public UserService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }


    public async Task<ServiceResponse<User>> AddUser(AddUserDto newUser)
    {
      var response = new ServiceResponse<User> { };
      var user = new User { Name = newUser.Name };

      if (!string.IsNullOrEmpty(newUser.Address))
      {
        user.Address = newUser.Address;
      }

      if (!string.IsNullOrEmpty(newUser.PostalArea))
      {
        user.PostalArea = newUser.PostalArea;
      }

      if (newUser.PostalCode > 0)
      {
        user.PostalCode = newUser.PostalCode;
      }

      if (newUser.BirthYear > 0)
      {
        user.BirthYear = newUser.BirthYear;
      }

      dataContext.Users.Add(user);
      await dataContext.SaveChangesAsync();

      response.Data = user;
      response.Message = "User successfully added!";
      response.StatusCode = StatusCodes.Status201Created;
      response.Success = true;

      return response;
    }

    public async Task<ServiceResponse<DeleteUserDto>> DeleteUser(Guid id)
    {
      var response = new ServiceResponse<DeleteUserDto> { };
      var user = await dataContext.Users.FindAsync(id);

      if (user == null)
      {
        response.Data = null;
        response.Message = "User was not found!";
        response.StatusCode = StatusCodes.Status400BadRequest;
        return response;
      }

      dataContext.Users.Remove(user);
      await dataContext.SaveChangesAsync();

      response.Data = null;
      response.StatusCode = StatusCodes.Status200OK;
      response.Message = "User successfully Deleted!";
      response.Success = true;

      return response;
    }

    public async Task<ServiceResponse<List<User>>> GetUsers()
    {
      var response = new ServiceResponse<List<User>> { };
      var users = await dataContext.Users.ToListAsync();
      response.Data = users;
      response.Message = "";
      response.Success = true;
      response.StatusCode = StatusCodes.Status200OK;
      return response;
    }

    public async Task<ServiceResponse<User>> UpdateUser(Guid id, UpdateUserDto updatedUser)
    {
      var response = new ServiceResponse<User> { };
      var user = await dataContext.Users.FindAsync(id);

      if (user == null)
      {
        response.Data = null;
        response.Message = "User was not found!";
        response.StatusCode = StatusCodes.Status400BadRequest;
        return response;
      }

      if (!string.IsNullOrEmpty(updatedUser.Name))
      {
        user.Name = updatedUser.Name;
      }

      if (!string.IsNullOrEmpty(updatedUser.Address))
      {
        user.Address = updatedUser.Address;
      }

      if (!string.IsNullOrEmpty(updatedUser.PostalArea))
      {
        user.PostalArea = updatedUser.PostalArea;
      }

      if (updatedUser.PostalCode > 0)
      {
        user.PostalCode = updatedUser.PostalCode;
      }

      if (updatedUser.BirthYear > 0)
      {
        user.BirthYear = updatedUser.BirthYear;
      }

      await dataContext.SaveChangesAsync();

      response.Data = user;
      response.StatusCode = StatusCodes.Status200OK;
      response.Message = "User successfully updated!";
      response.Success = true;

      return response;
    }
  }
}