using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Common.ServiceUtils.ServiceValidators.Common;
using restapi.Data;
using restapi.Entities;
using restapi.Services.Authentication.Common;

namespace restapi.Services.Authentication.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{
  private readonly DataContext dataContext;
  private readonly IJwtGenerator jwtGenerator;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly IPasswordProvider passwordProvider;

  public RegisterCommandHandler(DataContext dataContext, IJwtGenerator jwtGenerator, IDateTimeProvider dateTimeProvider, IPasswordProvider passwordProvider)
  {
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
    this.dateTimeProvider = dateTimeProvider;
    this.passwordProvider = passwordProvider;
  }

  public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand request, CancellationToken cancellationToken)
  {
    if (!EmailValidator.IsValidEmail(request.Email))
    {
      return Errors.Authentication.InvalidEmail;
    }

    var emailInUse = await dataContext.Users.AnyAsync(user => user.Email.ToLower() == request.Email, cancellationToken);

    if (emailInUse)
    {
      return Errors.Authentication.InvalidCredentials;
    }

    if (request.Password.Length < User.MinPasswordLength)
    {
      return Errors.User.InvalidPassword;
    }

    var email = await dataContext.Emails.FirstOrDefaultAsync(email => email.Address.ToLower() == request.Email, cancellationToken: cancellationToken);

    if (email?.Confirmed != true)
    {
      return Errors.EmailService.EmailNotConfirmed;
    }

    // TODO: Validate user-input!

    var user = new User
    {
      Id = Guid.NewGuid(),
      Email = request.Email,
      Password = passwordProvider.HashPassword(request.Password),
      FirstName = request.FirstName,
      LastName = request.LastName,
      DOB = request.DOB,
      Registered = dateTimeProvider.UtcNow
    };

    var userRole = await dataContext.Roles.FirstOrDefaultAsync(role => role.Name == "User", cancellationToken: cancellationToken);

    if (userRole is null)
    {
      userRole = new Role { Id = Guid.NewGuid(), Name = "User", Created = dateTimeProvider.UtcNow };
      dataContext.Roles.Add(userRole);
    }

    user.Roles.Add(userRole);

    if (request.FavoriteCategoryIds?.Count > 0)
    {
      foreach (Guid categoryId in request.FavoriteCategoryIds)
      {
        var category = await dataContext.Categories.FindAsync(new object?[] { categoryId }, cancellationToken: cancellationToken);

        if (category is not null)
        {
          user.FavoriteCategories.Add(category);
        }
      }
    }

    var token = jwtGenerator.GenerateUserToken(user);

    dataContext.Users.Add(user);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new AuthenticationResult(
      user,
      token
    );
  }
}