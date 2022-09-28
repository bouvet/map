using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Services.Jwt;
using restapi.Common.Services.Providers;
using restapi.Data;
using restapi.Models;
using restapi.Services.Authentication.Common;
using restapi.ServiceUtils.ServiceErrors;
using restapi.ServiceUtils.ServiceValidators.Common;

namespace restapi.Services.Authentication.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{
  private readonly DataContext dataContext;
  private readonly IJwtGenerator jwtGenerator;
  private readonly IDateTimeProvider dateTimeProvider;

  public RegisterCommandHandler(DataContext dataContext, IJwtGenerator jwtGenerator, IDateTimeProvider dateTimeProvider)
  {
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
    this.dateTimeProvider = dateTimeProvider;
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

    var userRole = await dataContext.Roles.FirstOrDefaultAsync(role => role.Name == "User", cancellationToken: cancellationToken) ??
                  new Role { Name = "User", Created = dateTimeProvider.CEST };

    // TODO: Validate user-input!

    var user = new User
    {
      Id = Guid.NewGuid(),
      Email = request.Email,
      Password = BCrypt.Net.BCrypt.HashPassword(request.Password)
    };

    user.Roles.Add(userRole);

    var token = jwtGenerator.GenerateToken(user);

    dataContext.Users.Add(user);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new AuthenticationResult(
      user,
      token
    );
  }
}