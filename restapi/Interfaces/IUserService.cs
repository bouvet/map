namespace VerdenVenter.Interfaces
{
  public interface IUserService
  {
    Task<ServiceResponse<User>> AddUser(AddUserDto newUser);
    Task<ServiceResponse<List<User>>> GetUsers();
    Task<ServiceResponse<User>> UpdateUser(Guid id, UpdateUserDto updatedUser);
    Task<ServiceResponse<DeleteUserDto>> DeleteUser(Guid id);
  }
}