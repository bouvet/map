using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
<<<<<<< HEAD
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.ServiceUtils.ServiceValidators.Common;
using restapi.Data;
using restapi.Models;
using restapi.Services.Authentication.Common;
=======
using restapi.Common.Services.Jwt;
using restapi.Data;
using restapi.Models;
using restapi.Services.Authentication.Common;
using restapi.ServiceUtils.ServiceErrors;
using restapi.ServiceUtils.ServiceValidators.Common;
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e

namespace restapi.Services.Authentication.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{
  private readonly DataContext dataContext;
  private readonly IJwtGenerator jwtGenerator;
<<<<<<< HEAD
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly IPasswordProvider passwordProvider;

  public RegisterCommandHandler(DataContext dataContext, IJwtGenerator jwtGenerator, IDateTimeProvider dateTimeProvider, IPasswordProvider passwordProvider)
  {
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
    this.dateTimeProvider = dateTimeProvider;
    this.passwordProvider = passwordProvider;
=======

  public RegisterCommandHandler(DataContext dataContext, IJwtGenerator jwtGenerator)
  {
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e
  }

  public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand request, CancellationToken cancellationToken)
  {
    if (!EmailValidator.IsValidEmail(request.Email))
    {
      return Errors.Authentication.InvalidEmail;
    }

    var emailInUse = await dataContext.Users.AnyAsync(user => user.Email == request.Email, cancellationToken);

    if (emailInUse)
    {
      return Errors.Authentication.InvalidCredentials;
    }

    if (request.Password.Length < User.MinPasswordLength)
    {
      return Errors.User.InvalidPassword;
    }

<<<<<<< HEAD
    var userRole = await dataContext.Roles.FirstOrDefaultAsync(role => role.Name == "User", cancellationToken: cancellationToken) ??
                  new Role { Name = "User", Created = dateTimeProvider.CEST };

    // TODO: Validate user-input!
=======
    // TODO: Validate user-input 
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e

    var user = new User
    {
      Id = Guid.NewGuid(),
      Email = request.Email,
<<<<<<< HEAD
      Password = passwordProvider.HashPassword(request.Password)
    };

    user.Roles.Add(userRole);

    var token = jwtGenerator.GenerateToken(user);
=======
      Password = BCrypt.Net.BCrypt.HashPassword(request.Password)
    };

    var token = await jwtGenerator.GenerateToken(user.Id, user.Email);
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e

    dataContext.Users.Add(user);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new AuthenticationResult(
<<<<<<< HEAD
      user,
      token
=======
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