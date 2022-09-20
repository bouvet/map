namespace VerdenVenter.Services
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

      return new ServiceResponse<User>
              (
                StatusCodes.Status201Created,
                data: user,
                Message: "User successfully added!"
              );
    }

    public async Task<ServiceResponse<DeleteUserDto>> DeleteUser(Guid id)
    {
      var user = await dataContext.Users.FindAsync(id);

      if (user == null)
      {
        return new ServiceResponse<DeleteUserDto>
              (
                StatusCodes.Status404NotFound,
                data: null,
                Message: "User was not found!"
              );
      }

      dataContext.Users.Remove(user);
      await dataContext.SaveChangesAsync();

      return new ServiceResponse<DeleteUserDto>
              (
                StatusCodes.Status204NoContent,
                data: null,
                Message: "User successfully Deleted!"
              );
    }

    public async Task<ServiceResponse<List<User>>> GetUsers()
    {
      var users = await dataContext.Users.ToListAsync();

      return new ServiceResponse<List<User>>
              (
                StatusCodes.Status200OK,
                data: users
              );
    }

    public async Task<ServiceResponse<User>> UpdateUser(Guid id, UpdateUserDto updatedUser)
    {
      var user = await dataContext.Users.FindAsync(id);

      if (user == null)
      {
        return new ServiceResponse<User>
              (
                StatusCodes.Status404NotFound,
                data: null,
                Message: "User was not found!"
              );
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

      return new ServiceResponse<User>
            (
              StatusCodes.Status200OK,
              data: user,
              Message: "User successfully updated!"
            );
    }
  }
}