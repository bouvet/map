using ErrorOr;
using MediatR;
using restapi.Services.Authentication.Common;

namespace restapi.Services.Authentication.Commands.RegisterWithGoogle;

public record RegisterWithGoogleCommand(
  string Email,
  string FirstName,
  string LastName,
  DateTime DOB,
  List<Guid>? FavoriteCategoryIds
) : IRequest<ErrorOr<AuthenticationResult>>;