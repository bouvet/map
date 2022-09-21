using ErrorOr;

namespace restapi.Interfaces
{
  public interface IUserService
  {
    Task<ErrorOr<User>> AddUser(AddUserDto newUser);
    Task<ErrorOr<List<User>>> GetUsers();
    Task<ErrorOr<User>> GetUser(Guid id);
    Task<ErrorOr<Updated>> UpdateUser(Guid id, UpdateUserDto updatedUser);
    Task<ErrorOr<Deleted>> DeleteUser(Guid id);
  }
}