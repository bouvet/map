using ErrorOr;
using MediatR;
using restapi.Services.Emails.Commands.Create;

namespace restapi.Services.Emails.Commands.ResendCode;

public record ResendCodeCommand(Guid Id) : IRequest<ErrorOr<CreateEmailResult>>;