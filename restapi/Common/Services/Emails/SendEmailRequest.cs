namespace restapi.Common.Services.Emails;

public record SendEmailRequest(
  string Subject,
  string ReceiverEmail,
  string ReceiverName,
  string PlainTextContent,
  string HtmlContent
);