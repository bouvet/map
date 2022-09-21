using ErrorOr;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Dtos;
using restapi.Models;
using restapi.ServiceErrors;

namespace restapi.Services.Users;

public class UserService : IUserService
{
  private readonly DataContext dataContext;

  public UserService(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }


  public async Task<ErrorOr<User>> AddUser(AddUserDto newUser)
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

    return user;
  }

  public async Task<ErrorOr<Deleted>> DeleteUser(Guid id)
  {
    var user = await dataContext.Users.FindAsync(id);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    dataContext.Users.Remove(user);
    await dataContext.SaveChangesAsync();

    return Result.Deleted;
  }

  public async Task<ErrorOr<User>> GetUser(Guid id)
  {
    var user = await dataContext.Users.FindAsync(id);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    return user;
  }

  public async Task<ErrorOr<List<User>>> GetUsers()
  {
    return await dataContext.Users.ToListAsync();
  }

  public async Task<ErrorOr<Updated>> UpdateUser(Guid id, UpdateUserDto updatedUser)
  {
    var user = await dataContext.Users.FindAsync(id);

    if (user == null)
    {
      return Errors.User.NotFound;
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

    return Result.Updated;
  }

  Task<ErrorOr<Deleted>> IUserService.DeleteUser(Guid id)
  {
    throw new NotImplementedException();
  }
}