using System.Reflection;
using MediatR;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.Services.Emails;
using restapi.Common.Services.Mappings;
using restapi.Common.Settings;

namespace restapi;

public static class DependencyInjection
{
  public static async Task<IServiceCollection> AddDependenciesAsync(
    this IServiceCollection services,
    ConfigurationManager configuration)
  {
    services.AddSettings(configuration);

    await services.AddProvidersAsync(configuration);

    services.AddMappers();
    services.AddMediatR(Assembly.GetExecutingAssembly());

    services.AddResponseCompression(options => options.EnableForHttps = true);

    services.AddCors(policy => policy.AddPolicy("any-domain", build => build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));

    services.AddControllers();

    services.AddAuth(configuration);

    services.AddEmail(configuration);

    services.AddHttpClient("ValidateGoogleCode", client => client.BaseAddress = new Uri(GoogleAuthSettings.AuthUri));

    return services;
  }
}