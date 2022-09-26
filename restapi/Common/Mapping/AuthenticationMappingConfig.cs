using Mapster;
using restapi.Dtos.Authentication;
using restapi.Services.Authentication.Commands.Register;
using restapi.Services.Authentication.Common;
using restapi.Services.Authentication.Queries.Login;

namespace restapi.Common.Mapping;

public class AuthenticationMappingConfig : IRegister
{
  public void Register(TypeAdapterConfig config)
  {
    config.NewConfig<RegisterRequest, RegisterCommand>();
    config.NewConfig<LoginRequest, LoginQuery>();

    config.NewConfig<AuthenticationResult, AuthenticationResponse>()
          .Map(dest => dest, src => src.User);
  }
}