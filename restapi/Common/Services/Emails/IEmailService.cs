using ErrorOr;

namespace restapi.Common.Services.Emails;

public interface IEmailService
{
  Task<ErrorOr<SendGrid.Response>> SendEmail(SendEmailRequest request);
}