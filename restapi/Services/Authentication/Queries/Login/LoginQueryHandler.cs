using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Common.Services;
using restapi.Common.ServiceUtils.ServiceErrors;
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
    var user = await dataContext.Users.SingleOrDefaultAsync(user => user.Email == request.Email, cancellationToken);

    if (user is null)
    {
      return Errors.Authentication.InvalidCredentials;
    }

    bool passwordIsValid = passwordProvider.VerifyPassword(request.Password, user.Password);

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