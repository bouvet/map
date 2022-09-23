using ErrorOr;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Services.Jwt;
using restapi.Data;
using restapi.Dtos.Users;
using restapi.Models;
using restapi.ServiceUtils.ServiceErrors;

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

  public async Task<ErrorOr<UserResponseDto>> GetUser(Guid id)
  {
    var user = await dataContext.Users.FindAsync(id);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    var token = jwtGenerator.GenerateToken(user.Id, user.Email);

    return MapToUserResponse(user, token);
  }

  public async Task<ErrorOr<List<UserResponseDto>>> GetUsers()
  {
    var users = await dataContext.Users.ToListAsync();

    return MapToUsersResponse(users);
  }

  public async Task<ErrorOr<Updated>> UpdateUser(Guid id, UpdateUserDto updatedUser)
  {
    var user = await dataContext.Users.FindAsync(id);

    if (user == null)
    {
      return Errors.User.NotFound;
    }

    //! TODO: Check password match!
    // TODO: Validate user-input

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

  private static List<UserResponseDto> MapToUsersResponse(List<User> users)
  {
    List<UserResponseDto> transformedUsers = new();

    foreach (User user in users)
    {
      transformedUsers.Add(new UserResponseDto
      {
        Id = user.Id,
        Email = user.Email,
        Address = user.Address,
        BirthYear = user.BirthYear,
        Name = user.Name,
        PostalArea = user.PostalArea,
        PostalCode = user.PostalCode,
      });
    }

    return transformedUsers;
  }
}