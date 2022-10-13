using Azure;
using Azure.Security.KeyVault.Secrets;
using ErrorOr;
using Microsoft.Extensions.Options;
using restapi.Common.Providers;
using restapi.Common.Settings;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace restapi.Common.Services.Emails;

public class EmailService : IEmailService
{
  private readonly SendGridSettings sendGridSettings;
  private readonly AzureProvider azureProvider;

  public EmailService(IOptions<SendGridSettings> sendGridOptions, IOptions<AzureProvider> azureOptions)
  {
    sendGridSettings = sendGridOptions.Value;
    azureProvider = azureOptions.Value;
  }

  public async Task<ErrorOr<SendGrid.Response>> SendEmail(SendEmailRequest request)
  {
    ErrorOr<string> apiKey = await GetApiKey();

    if (apiKey.IsError)
    {
      return Errors.Azure.KeyVaultSecretNotFound;
    }

    var client = new SendGridClient(apiKey.Value);
    var from = new EmailAddress(sendGridSettings.FromEmail, sendGridSettings.FromName);
    var subject = request.Subject;
    var to = new EmailAddress(request.ReceiverEmail, request.ReceiverName);
    var plainTextContent = request.PlainTextContent;
    var htmlContent = request.HtmlContent;
    var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

    SendGrid.Response response = await client.SendEmailAsync(msg);

    if (!response.IsSuccessStatusCode)
    {
      return Errors.EmailService.SendingEmailFailed;
    }

    return response;
  }

  private async Task<ErrorOr<string>> GetApiKey()
  {
    if (!string.IsNullOrEmpty(sendGridSettings.ApiKey))
    {
      return sendGridSettings.ApiKey;
    }

    Response<KeyVaultSecret> apiKey = await azureProvider.GetKeyVaultSecret(SendGridSettings.KeyVaultName);

    if (string.IsNullOrEmpty(apiKey.Value.Value))
    {
      return Errors.Azure.KeyVaultSecretNotFound;
    }

    sendGridSettings.ApiKey = apiKey.Value.Value;

    return apiKey.Value.Value;
  }
}
