using Microsoft.Extensions.Options;

namespace restapi.Common.Settings;

public static class DependencyInjection
{
  public static IServiceCollection AddSettings(this IServiceCollection services, ConfigurationManager configuration)
  {
    var googleAuthSettings = new GoogleAuthSettings();

    configuration.Bind(GoogleAuthSettings.SectionName, googleAuthSettings);

    services.AddSingleton(Options.Create(googleAuthSettings));

    return services;
  }
}