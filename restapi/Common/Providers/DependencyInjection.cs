using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using restapi.Common.Providers.Authorization;
using restapi.Common.Settings;
using restapi.Data;

namespace restapi.Common.Providers;

public static class DependencyInjection
{
  public static async Task<IServiceCollection> AddProvidersAsync(this IServiceCollection services, ConfigurationManager configuration)
  {
    await services.AddAzureKeyVault(configuration);

    services.AddSingleton<IImageProvider, ImageProvider>();
    services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
    services.AddSingleton<IPasswordProvider, PasswordProvider>();
    services.AddScoped<IAuthorizationProvider, AuthorizationProvider>();

    return services;
  }

  public async static Task<IServiceCollection> AddAzureKeyVault(
   this IServiceCollection services,
   ConfigurationManager configuration)
  {
    var azureProvider = new AzureProvider();

    configuration.Bind(AzureProvider.SectionName, azureProvider);

    services.AddSingleton(Options.Create(azureProvider));

    var googleAuthSettings = new GoogleAuthSettings();

    configuration.Bind(GoogleAuthSettings.SectionName, googleAuthSettings);

    services.AddSingleton(Options.Create(googleAuthSettings));

    var azureKeyVaultUri = azureProvider.KeyVaultUri;

    if (string.IsNullOrEmpty(azureKeyVaultUri))
    {
      azureProvider.KeyVaultUri = Environment.GetEnvironmentVariable(AzureProvider.KeyVaultUriName)!;
    }

    var keyVaultEndpoint = new Uri(azureProvider.KeyVaultUri);

    azureProvider.KeyVaultSecretClient = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());

    if (string.IsNullOrEmpty(azureProvider.DbConnectionString))
    {
      var keyVaultDbConnection = await azureProvider.KeyVaultSecretClient.GetSecretAsync(AzureProvider.KeyVaultNameForDbConnectionString);
      azureProvider.DbConnectionString = keyVaultDbConnection.Value.Value;
    }

    if (string.IsNullOrEmpty(googleAuthSettings.ClientId))
    {
      var clientId = await azureProvider.KeyVaultSecretClient.GetSecretAsync(GoogleAuthSettings.ClientIdKeyVaultName);
      var clientSecret = await azureProvider.KeyVaultSecretClient.GetSecretAsync(GoogleAuthSettings.ClientSecretKeyVaultName);
      var redirectUri = await azureProvider.KeyVaultSecretClient.GetSecretAsync(GoogleAuthSettings.RedirectUriKeyVaultName);

      googleAuthSettings.ClientId = clientId.Value.Value;
      googleAuthSettings.ClientSecret = clientSecret.Value.Value;
      googleAuthSettings.RedirectUri = redirectUri.Value.Value;
    }

    services.AddDbContext<DataContext>(opt => opt.UseSqlServer(azureProvider.DbConnectionString));
    // services.AddDbContext<DataContext>(opt => opt.UseSqlServer(azureProvider.DbConnectionString, o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));

    return services;
  }
}