using System.Reflection;
using System.Text;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using restapi.Common.Mapping;
using restapi.Common.Providers;
using restapi.Common.Services;
using restapi.Common.Settings;
using restapi.Data;
using restapi.Services.Locations;
using restapi.Services.Reviews;
using restapi.Services.Users;

namespace restapi;

public static class DependencyInjection
{
  public static async Task<IServiceCollection> AddDependenciesAsync(
    this IServiceCollection services,
    ConfigurationManager configuration)
  {
    await services.AddAzureKeyVault(configuration);

    services.AddMediatR(Assembly.GetExecutingAssembly());
    services.AddMappings();

    services.AddProviders();
    services.AddServices();

    services.AddResponseCompression(options => options.EnableForHttps = true);

    services.AddCors(policy => policy.AddPolicy("any-domain", build => build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));

    services.AddControllers();

    services.AddAuth(configuration);

    return services;
  }

  public static IServiceCollection AddAuth(
   this IServiceCollection services,
   ConfigurationManager configuration)
  {
    var jwtSettings = new JwtSettings();

    configuration.Bind(JwtSettings.SectionName, jwtSettings);

    services.AddSingleton(Options.Create(jwtSettings));

    if (string.IsNullOrEmpty(jwtSettings.Secret))
    {
      jwtSettings.Secret = Environment.GetEnvironmentVariable("JwtSecret")!;
    }

    if (jwtSettings.ExpiryMinutes < 1)
    {
      jwtSettings.ExpiryMinutes = int.Parse(Environment.GetEnvironmentVariable("ExpiryMinutes")!);
    }

    if (string.IsNullOrEmpty(jwtSettings.Issuer))
    {
      jwtSettings.Issuer = Environment.GetEnvironmentVariable("JwtIssuer")!;
    }

    if (string.IsNullOrEmpty(jwtSettings.Audience))
    {
      jwtSettings.Audience = Environment.GetEnvironmentVariable("JwtAudience")!;
    }

    services.AddScoped<IJwtGenerator, JwtGenerator>();

    services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters()
      {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(
              Encoding.UTF8.GetBytes(jwtSettings.Secret)
            )
      });

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

    services.AddDbContext<DataContext>(opt => opt.UseSqlServer(azureProvider.DbConnectionString));

    return services;
  }

  public static IServiceCollection AddProviders(this IServiceCollection services)
  {
    services.AddSingleton<IImageProvider, ImageProvider>();
    services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

    return services;
  }

  public static IServiceCollection AddServices(this IServiceCollection services)
  {
    services.AddScoped<IAzureBlobStorage, AzureBlobStorage>();
    services.AddScoped<IReviewService, ReviewService>();
    services.AddScoped<IUserService, UserService>();

    return services;
  }
}