using ErrorOr;
using MediatR;

namespace restapi.Services.Emails.Commands.Create;

public record CreateEmailCommand(string Email) : IRequest<ErrorOr<CreateEmailResult>>;