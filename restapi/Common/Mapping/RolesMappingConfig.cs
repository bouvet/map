using Mapster;
using restapi.Contracts.Roles;
using restapi.Services.Roles.Commands.Create;
using restapi.Services.Roles.Common;

namespace restapi.Common.Mapping;

public class RolesMappingConfig : IRegister
{
  public void Register(TypeAdapterConfig config)
  {
    config.NewConfig<RoleResult, RoleResponse>()
          .Map(dest => dest, src => src.Role);

    config.NewConfig<CreateRoleRequest, CreateRoleCommand>();
  }
}