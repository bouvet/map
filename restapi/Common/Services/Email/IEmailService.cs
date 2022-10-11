using ErrorOr;

namespace restapi.Common.Services.Email;

public interface IEmailService
{
  Task<ErrorOr<SendGrid.Response>> SendEmail(SendEmailRequest request);
}