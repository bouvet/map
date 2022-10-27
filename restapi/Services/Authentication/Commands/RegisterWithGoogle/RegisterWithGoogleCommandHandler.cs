using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Common.Services.Auth;
using restapi.Data;
using restapi.Entities;
using restapi.Services.Authentication.Common;

namespace restapi.Services.Authentication.Commands.RegisterWithGoogle;

public class RegisterWithGoogleCommandHandler : IRequestHandler<RegisterWithGoogleCommand, ErrorOr<AuthenticationResult>>
{
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;
  private readonly IJwtGenerator jwtGenerator;

  public RegisterWithGoogleCommandHandler(DataContext dataContext, IDateTimeProvider dateTimeProvider, IJwtGenerator jwtGenerator)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
    this.jwtGenerator = jwtGenerator;
  }

  public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterWithGoogleCommand request, CancellationToken cancellationToken)
  {
    var emailInUse = await dataContext.Users.AnyAsync(user => user.Email.ToLower() == request.Email, cancellationToken);

    if (emailInUse)
    {
      return Errors.Authentication.InvalidCredentials;
    }

    var user = new User
    {
      Id = Guid.NewGuid(),
      Email = request.Email,
      FirstName = request.FirstName,
      LastName = request.LastName,
      DOB = request.DOB,
      Registered = dateTimeProvider.CEST
    };

    var userRole = await dataContext.Roles.FirstOrDefaultAsync(role => role.Name == "User", cancellationToken: cancellationToken);

    if (userRole is null)
    {
      userRole = new Role { Id = Guid.NewGuid(), Name = "User", Created = dateTimeProvider.CEST };
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
