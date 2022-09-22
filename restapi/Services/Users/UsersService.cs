using ErrorOr;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Dtos.Users;
using restapi.Models;
using restapi.Services.Authentication;
using restapi.ServiceUtils.ServiceErrors;
using restapi.ServiceUtils.ServiceValidators.Common;

namespace restapi.Services.Users;

public class UserService : IUserService
{
  private readonly DataContext dataContext;
  private readonly IJwtGenerator jwtGenerator;

  public UserService(DataContext dataContext, IJwtGenerator jwtGenerator)
  {
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
  }

  public async Task<ErrorOr<UserResponseDto>> Register(RegisterUserDto request)
  {
    if (!EmailValidator.IsValidEmail(request.Email))
    {
      return Errors.User.InvalidEmail;
    }

    if (request.Password.Length < User.MinPasswordLength)
    {
      return Errors.User.InvalidPassword;
    }

    // TODO: Validate user-input 

    //! TODO: HASH PASSWORD!!!!!
    var user = new User
    {
      Id = Guid.NewGuid(),
      Email = request.Email,
      Password = request.Password
    };

    var token = jwtGenerator.GenerateToken(user.Id, user.Email);

    user.Address = string.IsNullOrEmpty(request.Address) ? "" : request.Address;
    user.PostalArea = string.IsNullOrEmpty(request.PostalArea) ? "" : request.PostalArea;
    user.PostalCode = request.PostalCode < 1 ? 0 : request.PostalCode;
    user.BirthYear = request.BirthYear < 1 ? 0 : request.BirthYear;

    dataContext.Users.Add(user);
    await dataContext.SaveChangesAsync();

    return MapToUserResponse(user, token);
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

  private static UserResponseDto MapToUserResponse(User user, string token)
  {
    return new UserResponseDto
    {
      Id = user.Id,
      Email = user.Email,
      Address = user.Address,
      BirthYear = user.BirthYear,
      Name = user.Name,
      PostalArea = user.PostalArea,
      PostalCode = user.PostalCode,
      Token = token
    };
  }
}