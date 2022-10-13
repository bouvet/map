using ErrorOr;
using MediatR;
using restapi.Services.Authentication.Common;

namespace restapi.Services.Authentication.Commands.Register;

public record RegisterCommand(
  string Email,
  string Password,
  string FirstName,
  string LastName,
  DateTime DOB,
  List<Guid>? FavoriteCategoryIds
) : IRequest<ErrorOr<AuthenticationResult>>;