using restapi.Common.Services.Mappers.Authentication;
using restapi.Common.Services.Mappers.Categories;
using restapi.Common.Services.Mappers.ImageStorage;
using restapi.Common.Services.Mappers.Locations;
using restapi.Common.Services.Mappers.Reviews;
using restapi.Common.Services.Mappers.Roles;
using restapi.Common.Services.Mappers.Users;

namespace restapi.Common.Services.Mappings;

public static class DependencyInjection
{
  public static IServiceCollection AddMappers(this IServiceCollection services)
  {
    services.AddScoped<IAuthenticationMapper, AuthenticationMapper>();
    services.AddScoped<ICategoryMapper, CategoryMapper>();
    services.AddScoped<ILocationMapper, LocationMapper>();
    services.AddScoped<IReviewMapper, ReviewMapper>();
    services.AddScoped<IRoleMapper, RoleMapper>();
    services.AddScoped<IUserMapper, UserMapper>();
    services.AddScoped<IImageStorageMapper, ImageStorageMapper>();

    return services;
  }
}