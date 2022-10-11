namespace restapi.Common.Services.Email;

public record SendEmailRequest(
  string Subject,
  string ReceiverEmail,
  string ReceiverName,
  string PlainTextContent,
  string HtmlContent
);