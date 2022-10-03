<<<<<<< HEAD
=======


>>>>>>> c3bab50c635a2f21b1396738001752828fde266e
using ErrorOr;
using MediatR;
using restapi.Services.Authentication.Common;

namespace restapi.Services.Authentication.Queries.Login;

public record LoginQuery(
  string Email,
  string Password

) : IRequest<ErrorOr<AuthenticationResult>>;