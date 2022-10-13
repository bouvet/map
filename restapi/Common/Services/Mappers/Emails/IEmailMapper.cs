using restapi.Contracts.Emails;
using restapi.Services.Emails.Common;

namespace restapi.Common.Services.Mappers.Emails;

public interface IEmailMapper
{
  EmailResponse MapResultToResponse(EmailResult result);
  List<EmailResponse> MapResultListToResponseList(List<EmailResult> resultList);
}