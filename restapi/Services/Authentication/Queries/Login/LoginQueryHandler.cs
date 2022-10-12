using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Data;
using restapi.Services.Authentication.Common;

namespace restapi.Services.Authentication.Queries.Login;

public class LoginQueryHandler : IRequestHandler<LoginQuery, ErrorOr<AuthenticationResult>>
{
  private readonly DataContext dataContext;
  private readonly IJwtGenerator jwtGenerator;
  private readonly IPasswordProvider passwordProvider;

  public LoginQueryHandler(DataContext dataContext, IJwtGenerator jwtGenerator, IPasswordProvider passwordProvider)
  {
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
    this.passwordProvider = passwordProvider;
  }

  public async Task<ErrorOr<AuthenticationResult>> Handle(LoginQuery request, CancellationToken cancellationToken)
  {
    var user = await dataContext
      .Users
      .Include(user => user.Roles)
      .ThenInclude(role => role.Creator)
      .Include(user => user.Roles)
      .ThenInclude(role => role.Editor)
      .SingleOrDefaultAsync(user => user.Email.ToLower() == request.Email, cancellationToken: cancellationToken);

    if (user is null)
    {
      return Errors.Authentication.InvalidCredentials;
    }

    bool passwordIsValid = passwordProvider.VerifyPassword(request.Password, user.Password);

    if (!passwordIsValid)
    {
      return Errors.Authentication.InvalidCredentials;
    }

    var token = jwtGenerator.GenerateUserToken(user);

    return new AuthenticationResult(
      user,
      token
    );
  }
}