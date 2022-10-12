using restapi.Contracts.Emails;
using restapi.Services.Emails.Common;

namespace restapi.Common.Services.Mappers.Emails;

public class EmailMapper : IEmailMapper
{
  public List<EmailResponse> MapResultListToResponseList(List<EmailResult> resultList)
  {
    var responseList = new List<EmailResponse>();

    foreach (var result in resultList)
    {
      responseList.Add(new EmailResponse(
        result.Email.Id,
        result.Email.Address,
        result.Email.ConfirmationCode,
        result.Email.Confirmed,
        result.Email.Created,
        result.Email.Updated
      ));
    }

    return responseList;
  }

  public EmailResponse MapResultToResponse(EmailResult result)
  {
    return new EmailResponse(
      result.Email.Id,
      result.Email.Address,
      result.Email.ConfirmationCode,
      result.Email.Confirmed,
      result.Email.Created,
      result.Email.Updated
    );
  }
}