using ErrorOr;
using MediatR;

namespace restapi.Services.Users.Commands.Update;

public record UpdateUserCommand(
  Guid Id,
  string? Email,
  string? FirstName,
  string? LastName,
  string? Address,
  string? PostalArea,
  int PostalCode,
  int PhoneNumber,
  DateTime? DOB
) : IRequest<ErrorOr<Updated>>;