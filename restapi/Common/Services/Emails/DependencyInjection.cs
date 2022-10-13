using Microsoft.Extensions.Options;
using restapi.Common.Settings;

namespace restapi.Common.Services.Emails;

public static class DependencyInjection
{
  public static IServiceCollection AddEmail(
     this IServiceCollection services,
     ConfigurationManager configuration)
  {
    var sendGridSettings = new SendGridSettings();

    configuration.Bind(SendGridSettings.SectionName, sendGridSettings);

    services.AddSingleton(Options.Create(sendGridSettings));

    if (string.IsNullOrEmpty(sendGridSettings.FromEmail))
    {
      sendGridSettings.FromEmail = Environment.GetEnvironmentVariable("SGFromEmail")!;
    }

    if (string.IsNullOrEmpty(sendGridSettings.FromName))
    {
      sendGridSettings.FromName = Environment.GetEnvironmentVariable("SGFromName")!;
    }

    services.AddScoped<IEmailService, EmailService>();

    return services;
  }
}