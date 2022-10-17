using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using restapi.Common.Providers.Authorization;
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
  private readonly IAuthorizationProvider authorizationProvider;

  public EmailController(ISender mediator, IEmailMapper emailMapper, IAuthorizationProvider authorizationProvider)
  {
    this.mediator = mediator;
    this.emailMapper = emailMapper;
    this.authorizationProvider = authorizationProvider;
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
  [HttpDelete("{email:string}")]
  public async Task<IActionResult> DeleteEmail(string email)
  {
    var authResult = authorizationProvider.CheckAuthorization(HttpContext.User);
    var emailId = HttpContext.User.FindFirst("emailId")?.Value;

    if (authResult.UserId is null && !authResult.IsAdmin)
    {
      return Forbid();
    }

    var deleteEmailCommand = new DeleteEmailCommand(
        email.ToLower(),
        authResult.IsAdmin,
        emailId ?? ""
      );

    ErrorOr<Deleted> deleteEmailResult = await mediator.Send(deleteEmailCommand);

    return deleteEmailResult.Match(
      _ => NoContent(),
      errors => Problem(errors)
    );
  }
}