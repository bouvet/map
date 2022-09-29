using Mapster;
using restapi.Contracts.Locations;
using restapi.Services.Locations.Command.Create;
using restapi.Services.Locations.Common;

namespace restapi.Common.Mapping;

public class LocationsMappingConfig : IRegister
{
  public void Register(TypeAdapterConfig config)
  {
    config.NewConfig<LocationResult, LocationResponse>()
          .Map(dest => dest, src => src)
          .Map(dest => dest.Type, _ => "Feature")
          .Map(dest => dest.Properties, src => src)
          .Map(dest => dest.Geometry, src => src);

    config.NewConfig<CreateLocationRequest, CreateLocationCommand>();
  }
}