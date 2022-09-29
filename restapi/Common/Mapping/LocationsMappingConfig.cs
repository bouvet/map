using Mapster;
using restapi.Contracts.Locations;
using restapi.Services.Locations.Command.Create;
using restapi.Services.Locations.Common;

namespace restapi.Common.Mapping;

public class LocationsMappingConfig : IRegister
{
  public void Register(TypeAdapterConfig config)
  {
    config.NewConfig<CreateLocationRequest, CreateLocationCommand>();
  }
}