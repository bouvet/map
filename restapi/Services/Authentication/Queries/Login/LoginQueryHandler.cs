using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
<<<<<<< HEAD
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Data;
using restapi.Services.Authentication.Common;
=======
using restapi.Common.Services.Jwt;
using restapi.Data;
using restapi.Services.Authentication.Common;
using restapi.ServiceUtils.ServiceErrors;
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e

namespace restapi.Services.Authentication.Queries.Login;

public class LoginQueryHandler : IRequestHandler<LoginQuery, ErrorOr<AuthenticationResult>>
{
  private readonly DataContext dataContext;
  private readonly IJwtGenerator jwtGenerator;
<<<<<<< HEAD
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
=======

  public LoginQueryHandler(DataContext dataContext, IJwtGenerator jwtGenerator)
  {
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
  }

  public async Task<ErrorOr<AuthenticationResult>> Handle(LoginQuery query, CancellationToken cancellationToken)
  {
    var user = await dataContext.Users.SingleOrDefaultAsync(user => user.Email == query.Email, cancellationToken);
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e

    if (user is null)
    {
      return Errors.Authentication.InvalidCredentials;
    }

<<<<<<< HEAD
    bool passwordIsValid = passwordProvider.VerifyPassword(request.Password, user.Password);
=======
    bool passwordIsValid = BCrypt.Net.BCrypt.Verify(query.Password, user.Password);
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e

    if (!passwordIsValid)
    {
      return Errors.Authentication.InvalidCredentials;
    }

<<<<<<< HEAD
    var token = jwtGenerator.GenerateToken(user);

    return new AuthenticationResult(
      user,
      token
=======
    var token = await jwtGenerator.GenerateToken(user.Id, user.Email);

    return new AuthenticationResult(
      user.Id,
      user.Email,
      user.Name,
      user.Address,
      user.PostalArea,
      token,
      user.PostalCode,
      user.BirthYear
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e
    );
  }
}