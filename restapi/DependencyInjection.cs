using System.Reflection;
using MediatR;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.Services.Mappings;
using restapi.Common.Services.Storage;

namespace restapi;

public static class DependencyInjection
{
  public static async Task<IServiceCollection> AddDependenciesAsync(
    this IServiceCollection services,
    ConfigurationManager configuration)
  {
    await services.AddProvidersAsync(configuration);

    services.AddMediatR(Assembly.GetExecutingAssembly());

    services.AddScoped<IAzureBlobStorage, AzureBlobStorage>();
    services.AddMappings();

    services.AddResponseCompression(options => options.EnableForHttps = true);

    services.AddCors(policy => policy.AddPolicy("any-domain", build => build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));

    services.AddControllers();

    services.AddAuth(configuration);

    return services;
  }
}