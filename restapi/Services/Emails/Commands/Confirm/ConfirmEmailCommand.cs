using ErrorOr;
using MediatR;
using restapi.Services.Emails.Common;

namespace restapi.Services.Emails.Commands.Confirm;

public record ConfirmEmailCommand(string Address, int ConfirmationCode) : IRequest<ErrorOr<EmailResult>>;