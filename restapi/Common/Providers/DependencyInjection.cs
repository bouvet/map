using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using restapi.Common.Providers.Authorization;
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

    var azureKeyVaultUri = azureProvider.KeyVaultUri;

    if (string.IsNullOrEmpty(azureKeyVaultUri))
    {
      azureProvider.KeyVaultUri = Environment.GetEnvironmentVariable(AzureProvider.KeyVaultUriName)!;
    }

    var keyVaultEndpoint = new Uri(azureProvider.KeyVaultUri);

    // configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

    azureProvider.KeyVaultSecretClient = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());

    if (string.IsNullOrEmpty(azureProvider.DbConnectionString))
    {
      var keyVaultDbConnection = await azureProvider.KeyVaultSecretClient.GetSecretAsync(AzureProvider.KeyVaultNameForDbConnectionString);
      azureProvider.DbConnectionString = keyVaultDbConnection.Value.Value;
    }

    services.AddDbContext<DataContext>(opt => opt.UseSqlServer(azureProvider.DbConnectionString, o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));

    return services;
  }
}