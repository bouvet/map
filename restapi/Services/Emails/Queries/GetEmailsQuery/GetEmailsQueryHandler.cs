using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Services.Emails.Common;

namespace restapi.Services.Emails.Queries.GetEmailsQuery;

public class GetEmailsQueryHandler : IRequestHandler<GetEmailsQuery, ErrorOr<List<EmailResult>>>
{
  private readonly DataContext dataContext;

  public GetEmailsQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<List<EmailResult>>> Handle(GetEmailsQuery request, CancellationToken cancellationToken)
  {
    var emails = await dataContext.Emails.ToListAsync(cancellationToken: cancellationToken);

    var emailResults = new List<EmailResult>();

    foreach (var email in emails)
    {
      emailResults.Add(new EmailResult(email));
    }

    return emailResults;
  }
}
