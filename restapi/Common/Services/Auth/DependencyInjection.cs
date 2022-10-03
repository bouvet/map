using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using restapi.Common.Settings;

namespace restapi.Common.Services.Auth;

public static class DependencyInjection
{
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
}