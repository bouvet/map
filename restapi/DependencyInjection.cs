using System.Reflection;
<<<<<<< HEAD
using MediatR;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.Services.Mappings;
using restapi.Common.Services.Storage;
=======
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Services.Jwt;
using restapi.Common.Services.Providers;
using restapi.Common.Services.Settings;
using restapi.Data;
using restapi.Services.AzureBlobStorage;
using restapi.Services.Categories;
using restapi.Services.Locations;
using restapi.Services.Reviews;
using restapi.Services.Users;
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e

namespace restapi;

public static class DependencyInjection
{
<<<<<<< HEAD
  public static async Task<IServiceCollection> AddDependenciesAsync(
    this IServiceCollection services,
    ConfigurationManager configuration)
  {
    await services.AddProvidersAsync(configuration);

    services.AddMediatR(Assembly.GetExecutingAssembly());

    services.AddScoped<IAzureBlobStorage, AzureBlobStorage>();
    services.AddMappings();
=======
  public static async Task<IServiceCollection> AddDependenciesAsync(this IServiceCollection services, ConfigurationManager configuration)
  {
    var azureKeyVaultUri = Environment.GetEnvironmentVariable(AzureSettings.KeyVaultUri);

    if (string.IsNullOrEmpty(azureKeyVaultUri))
    {
      azureKeyVaultUri = configuration["KeyVaultUri"];
    }

    var keyVaultEndpoint = new Uri(azureKeyVaultUri!);

    configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

    var secretClient = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());
    var DbConnectionString = await secretClient.GetSecretAsync(AzureSettings.KeyVaultNameForDbConnectionString);

    services.AddDbContext<DataContext>(opt => opt.UseSqlServer(DbConnectionString.Value.Value));

    services.AddMediatR(Assembly.GetExecutingAssembly());

    services.AddScoped<IAzureProvider, AzureProvider>();
    services.AddScoped<IImageProvider, ImageProvider>();

    services.AddScoped<IJwtGenerator, JwtGenerator>();
    services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

    services.AddScoped<IAzureBlobStorageService, AzureBlobStorageService>();
    services.AddScoped<ILocationService, LocationService>();
    services.AddScoped<ICategoryService, CategoryService>();
    services.AddScoped<IReviewService, ReviewService>();
    services.AddScoped<IUserService, UserService>();
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e

    services.AddResponseCompression(options => options.EnableForHttps = true);

    services.AddCors(policy => policy.AddPolicy("any-domain", build => build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));

    services.AddControllers();

<<<<<<< HEAD
    services.AddAuth(configuration);

=======
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e
    return services;
  }
}