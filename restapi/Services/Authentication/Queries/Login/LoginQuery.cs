

using ErrorOr;
using MediatR;
using restapi.Services.Authentication.Common;

namespace restapi.Services.Authentication.Queries.Login;

public record LoginQuery(
  string Email,
  string Password

) : IRequest<ErrorOr<AuthenticationResult>>;