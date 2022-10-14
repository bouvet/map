using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Services.Mappers.Emails;
using restapi.Contracts.Emails;
using restapi.Services.Emails.Commands.Confirm;
using restapi.Services.Emails.Commands.Create;
using restapi.Services.Emails.Commands.Delete;
using restapi.Services.Emails.Common;
using restapi.Services.Emails.Queries.GetEmailsQuery;

namespace restapi.Controllers;

public class EmailController : ApiController
{
  private readonly ISender mediator;
  private readonly IEmailMapper emailMapper;

  public EmailController(ISender mediator, IEmailMapper emailMapper)
  {
    this.mediator = mediator;
    this.emailMapper = emailMapper;
  }

  [HttpPost]
  public async Task<IActionResult> CreateEmail(CreateEmailRequest request)
  {
    var createEmailCommand = new CreateEmailCommand(request.Email.ToLower());

    ErrorOr<CreateEmailResult> createEmailResult = await mediator.Send(createEmailCommand);

    return createEmailResult.Match(
      result => Ok(result),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "Registering")]
  [HttpPost("confirm")]
  public async Task<IActionResult> ConfirmEmail(ConfirmEmailRequest request)
  {
    var confirmEmailCommand = new ConfirmEmailCommand(
      request.Email,
      request.ConfirmationCode
    );

    ErrorOr<EmailResult> confirmEmailResult = await mediator.Send(confirmEmailCommand);

    return confirmEmailResult.Match(
      result => Ok(emailMapper.MapResultToResponse(result)),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "Administrator")]
  [HttpGet]
  public async Task<IActionResult> GetEmails()
  {
    var getEmailsQuery = new GetEmailsQuery();

    ErrorOr<List<EmailResult>> getEmailQueryResult = await mediator.Send(getEmailsQuery);

    return getEmailQueryResult.Match(
      result => Ok(emailMapper.MapResultListToResponseList(result)),
      errors => Problem(errors)
    );
  }

  [Authorize(Roles = "Administrator, Registering")]
  [HttpDelete("{email}")]
  public async Task<IActionResult> DeleteEmail(string email)
  {
    var emailId = HttpContext.User.FindFirst("emailId")?.Value;
    var isAdmin = HttpContext.User.IsInRole("Administrator");

    if (string.IsNullOrEmpty(emailId) && !isAdmin)
    {
      return Forbid();
    }

    var deleteEmailCommand = new DeleteEmailCommand(
        email.ToLower(),
        isAdmin,
        emailId ?? ""
      );

    ErrorOr<Deleted> deleteEmailResult = await mediator.Send(deleteEmailCommand);

    return deleteEmailResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }
}