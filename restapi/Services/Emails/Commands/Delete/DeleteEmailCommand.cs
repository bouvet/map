using ErrorOr;
using MediatR;

namespace restapi.Services.Emails.Commands.Delete;

public record DeleteEmailCommand(
  string Email,
  bool IsAdmin,
  string EmailId
) : IRequest<ErrorOr<Deleted>>;