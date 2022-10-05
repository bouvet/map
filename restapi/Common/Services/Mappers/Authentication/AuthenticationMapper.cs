using restapi.Common.Services.Mappers.Roles;
using restapi.Contracts.Authentication;
using restapi.Services.Authentication.Commands.Register;
using restapi.Services.Authentication.Common;
using restapi.Services.Authentication.Queries.Login;

namespace restapi.Common.Services.Mappers.Authentication;

public class AuthenticationMapper : IAuthenticationMapper
{
  private readonly IRoleMapper roleMapper;

  public AuthenticationMapper(IRoleMapper roleMapper)
  {
    this.roleMapper = roleMapper;
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
      request.Password
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
      roleMapper.MapDbListToResponseList(result.User.Roles),
      result.Token
    );
  }
}
