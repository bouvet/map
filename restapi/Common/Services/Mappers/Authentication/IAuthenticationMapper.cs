using restapi.Contracts.Authentication;
using restapi.Services.Authentication.Commands.Register;
using restapi.Services.Authentication.Common;
using restapi.Services.Authentication.Queries.Login;

namespace restapi.Common.Services.Mappers.Authentication;

public interface IAuthenticationMapper
{
  RegisterCommand MapRegisterRequestToCommand(RegisterRequest request);
  LoginQuery MapLoginQueryToCommand(LoginRequest request);
  AuthenticationResponse MapResultToResponse(AuthenticationResult result);
}