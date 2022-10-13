using ErrorOr;
using MediatR;
using restapi.Services.Emails.Common;

namespace restapi.Services.Emails.Queries.GetEmailsQuery;

public record GetEmailsQuery() : IRequest<ErrorOr<List<EmailResult>>>;