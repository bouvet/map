using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
using restapi.Common;
using restapi.Common.Services;
using restapi.Data;
using restapi.Services.Authentication;
using restapi.Services.AzureBlobStorage;
using restapi.Services.Categories;
using restapi.Services.Locations;
using restapi.Services.Reviews;
using restapi.Services.Users;

namespace restapi;

public static class DependencyInjection
{
  public static async Task<IServiceCollection> AddDependenciesAsync(
    this IServiceCollection services,
    IWebHostEnvironment environment,
    ConfigurationManager configuration
  )

  {
    services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
    services.Configure<AzureSettings>(configuration.GetSection(AzureSettings.SectionName));

    if (environment.IsProduction())
    {
      Console.WriteLine("APPLICATION RUNNING IN PRODUCTION MODE");

      var azureKeyVault = Environment.GetEnvironmentVariable("KeyVaultUri");

      var keyVaultEndpoint = new Uri(azureKeyVault!);

      configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

      var secretClient = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());

      var DbConnectionString = await secretClient.GetSecretAsync("DbConnectionString");

      services.AddDbContext<DataContext>(opt => opt.UseSqlServer(DbConnectionString.Value.Value));
    }

    if (environment.IsDevelopment())
    {
      Console.WriteLine("APPLICATION RUNNING IN DEVELOPMENT MODE");

      services.AddDbContext<DataContext>(opt => opt.UseSqlServer(configuration["Dev:DbConnectionString"]));
    }

    services.AddControllers();

    services.AddSingleton<IJwtGenerator, JwtGenerator>();
    services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

    services.AddScoped<IAzureBlobStorageService, AzureBlobStorageService>();
    services.AddScoped<ILocationService, LocationService>();
    services.AddScoped<ICategoryService, CategoryService>();
    services.AddScoped<IReviewService, ReviewService>();
    services.AddScoped<IUserService, UserService>();

    services.AddResponseCompression(options => options.EnableForHttps = true);

    services.AddCors(policy => policy.AddPolicy("any-domain", build => build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));

    return services;
  }
}