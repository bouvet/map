using restapi.Common.Services.Mappers.Categories;
using restapi.Common.Services.Mappers.Roles;
using restapi.Contracts.Authentication;
using restapi.Services.Authentication.Commands.Register;
using restapi.Services.Authentication.Common;
using restapi.Services.Authentication.Queries.Login;

namespace restapi.Common.Services.Mappers.Authentication;

public class AuthenticationMapper : IAuthenticationMapper
{
  private readonly IRoleMapper roleMapper;
  private readonly ICategoryMapper categoryMapper;

  public AuthenticationMapper(IRoleMapper roleMapper, ICategoryMapper categoryMapper)
  {
    this.roleMapper = roleMapper;
    this.categoryMapper = categoryMapper;
  }

  public LoginQuery MapLoginQueryToCommand(LoginRequest request)
  {
    return new LoginQuery(
      request.Email,
      request.Password
    );
  }

  public RegisterCommand MapRegisterRequestToCommand(RegisterRequest request)
  {
    return new RegisterCommand(
      request.Email,
      request.Password,
      request.FirstName,
      request.LastName,
      request.DOB,
      request.FavoriteCategoryIds
    );
  }

  public AuthenticationResponse MapResultToResponse(AuthenticationResult result)
  {
    return new AuthenticationResponse(
      result.User.Id,
      result.User.Email,
      result.User.FirstName,
      result.User.LastName,
      result.User.Address,
      result.User.PostalArea,
      result.User.PostalCode,
      result.User.PhoneNumber,
      result.User.DOB,
      result.User.Registered,
      roleMapper.MapDbListToResponseList(result.User.Roles),
      categoryMapper.MapDbListToResponseList(result.User.FavoriteCategories),
      result.Token
    );
  }
}
