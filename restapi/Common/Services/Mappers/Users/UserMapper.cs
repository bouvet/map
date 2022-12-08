using restapi.Common.Services.Mappers.Categories;
using restapi.Common.Services.Mappers.ImageStorage;
using restapi.Common.Services.Mappers.Roles;
using restapi.Contracts.Categories;
using restapi.Contracts.Users;
using restapi.Entities;
using restapi.Services.Users.Commands.AddUserRole;
using restapi.Services.Users.Commands.Delete;
using restapi.Services.Users.Commands.Update;
using restapi.Services.Users.Common;
using restapi.Services.Users.Queries.GetUserById;
using restapi.Services.Users.Queries.GetUsers;

namespace restapi.Common.Services.Mappers.Users;

public class UserMapper : IUserMapper
{
  private readonly IRoleMapper roleMapper;
  private readonly IImageStorageMapper imageStorageMapper;

  public UserMapper(IRoleMapper roleMapper, IImageStorageMapper imageStorageMapper)
  {
    this.roleMapper = roleMapper;
    this.imageStorageMapper = imageStorageMapper;
  }

  public UserResponse MapUserToUserResponse(User user)
  {
    var favoriteCategories = new List<CategoryResponse>();

    foreach (var category in user.FavoriteCategories)
    {
      favoriteCategories.Add(new CategoryResponse(
        category.Id,
        category.Name,
        category.Emoji,
        category.Created,
        category.Updated,
        null,
        null));
    }

    return new UserResponse(
        user.Id,
        user.Email,
        user.FirstName,
        user.LastName,
        user.Address,
        user.PostalArea,
        user.PostalCode,
        user.PhoneNumber,
        user.DOB,
        roleMapper.MapDbListToResponseList(user.Roles),
        favoriteCategories,
        user.OriginalProfileImage is not null ? imageStorageMapper.MapDbResultToResponse(user.OriginalProfileImage) : null,
        user.WebpProfileImage is not null ? imageStorageMapper.MapDbResultToResponse(user.WebpProfileImage) : null,
        null
      );
  }

  public UserResponse MapResultToResponse(UserResult result)
  {
    var favoriteCategories = new List<CategoryResponse>();

    foreach (var category in result.User.FavoriteCategories)
    {
      favoriteCategories.Add(new CategoryResponse(
        category.Id,
        category.Name,
        category.Emoji,
        category.Created,
        category.Updated,
        null,
        null));
    }

    return new UserResponse(
      result.User.Id,
      result.User.Email,
      result.User.FirstName,
      result.User.LastName,
      result.User.Address,
      result.User.PostalArea,
      result.User.PostalCode,
      result.User.PhoneNumber,
      result.User.DOB,
      roleMapper.MapDbListToResponseList(result.User.Roles),
      favoriteCategories,
      result.User.OriginalProfileImage is not null ? imageStorageMapper.MapDbResultToResponse(result.User.OriginalProfileImage) : null,
      result.User.WebpProfileImage is not null ? imageStorageMapper.MapDbResultToResponse(result.User.WebpProfileImage) : null,
      result.Token
    );
  }

  public List<UserResponse> MapResultListToResponseList(List<UserResult> resultList)
  {
    var responseList = new List<UserResponse>();

    foreach (var result in resultList)
    {
      responseList.Add(MapResultToResponse(result));
    }

    return responseList;
  }

  public GetUsersQuery MapGetUsersToCommand()
  {
    return new GetUsersQuery();
  }

  public GetUserByIdQuery MapGetByIdToCommand(Guid id, Guid? UserId)
  {
    return new GetUserByIdQuery(id, UserId);
  }

  public UpdateUserCommand MapUpdateToCommand(Guid id, UpdateUserRequest request)
  {
    return new UpdateUserCommand(
      id,
      request.FirstName,
      request.LastName,
      request.Address,
      request.PostalArea,
      request.PostalCode,
      request.PhoneNumber,
      request.DeleteProfileImage,
      request.DOB,
      request.FavoriteCategoryIds,
      request.ProfileImage
    );
  }

  public AddUserRoleCommand MapAddRoleToCommand(AddUserRoleRequest request)
  {
    return new AddUserRoleCommand(
      request.UserId,
      request.RoleId
    );
  }

  public DeleteUserCommand MapDeleteToCommand(Guid id)
  {
    return new DeleteUserCommand(id);
  }

  public MinifiedUserResponse MapUserToMinifiedUserResponse(User user)
  {
    return new MinifiedUserResponse(
      user.Id,
      user.Email,
      user.FirstName,
      user.LastName,
      user.DOB
    );
  }
}
