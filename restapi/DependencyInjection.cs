using System.Reflection;
using MediatR;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.Services.Mappings;

namespace restapi;

public static class DependencyInjection
{
  public static async Task<IServiceCollection> AddDependenciesAsync(
    this IServiceCollection services,
    ConfigurationManager configuration)
  {
    await services.AddProvidersAsync(configuration);

    services.AddMappers();
    services.AddMediatR(Assembly.GetExecutingAssembly());

    services.AddResponseCompression(options => options.EnableForHttps = true);

    services.AddCors(policy => policy.AddPolicy("any-domain", build => build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));

    services.AddControllers();

    services.AddAuth(configuration);

    return services;
  }
}