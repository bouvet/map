using System.Reflection;
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

namespace restapi;

public static class DependencyInjection
{
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

    services.AddResponseCompression(options => options.EnableForHttps = true);

    services.AddCors(policy => policy.AddPolicy("any-domain", build => build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));

    services.AddControllers();

    return services;
  }
}