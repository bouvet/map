using ErrorOr;
using restapi.Dtos.Users;
using restapi.Models;

namespace restapi.Services.Users;

public interface IUserService
{
  Task<ErrorOr<UserResponseDto>> Register(RegisterUserDto newUser);
  Task<ErrorOr<List<User>>> GetUsers();
  Task<ErrorOr<User>> GetUser(Guid id);
  Task<ErrorOr<Updated>> UpdateUser(Guid id, UpdateUserDto updatedUser);
  Task<ErrorOr<Deleted>> DeleteUser(Guid id);
}