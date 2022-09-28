using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Services;
using restapi.Data;
using restapi.Services.Authentication.Common;
using restapi.ServiceUtils.ServiceErrors;

namespace restapi.Services.Authentication.Queries.Login;

public class LoginQueryHandler : IRequestHandler<LoginQuery, ErrorOr<AuthenticationResult>>
{
  private readonly DataContext dataContext;
  private readonly IJwtGenerator jwtGenerator;

  public LoginQueryHandler(DataContext dataContext, IJwtGenerator jwtGenerator)
  {
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
  }

  public async Task<ErrorOr<AuthenticationResult>> Handle(LoginQuery query, CancellationToken cancellationToken)
  {
    var user = await dataContext.Users.SingleOrDefaultAsync(user => user.Email == query.Email, cancellationToken);

    if (user is null)
    {
      return Errors.Authentication.InvalidCredentials;
    }

    bool passwordIsValid = BCrypt.Net.BCrypt.Verify(query.Password, user.Password);

    if (!passwordIsValid)
    {
      return Errors.Authentication.InvalidCredentials;
    }

    var token = jwtGenerator.GenerateToken(user);

    return new AuthenticationResult(
      user,
      token
    );
  }
}