using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Models;

namespace restapi.Services.Users.Commands.Update;

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, ErrorOr<Updated>>
{
  private readonly DataContext dataContext;

  public UpdateUserCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Updated>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
  {
    var user = await dataContext.Users.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (user == null)
    {
      return Errors.User.NotFound;
    }

    // TODO: Validate user-input
    MapUpdatedUser(user, request);

    if (request.RoleIds?.Count > 0)
    {
      user.Roles = new List<Role>();

      foreach (Guid roleId in request.RoleIds)
      {
        var role = await dataContext.Roles.FindAsync(new object?[] { roleId }, cancellationToken: cancellationToken);

        if (role == null)
        {
          return Errors.Role.NotFound;
        }

        user.Roles.Add(role);
      }
    }

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Updated;
  }

  private static User MapUpdatedUser(User user, UpdateUserCommand request)
  {
    user.Email = string.IsNullOrEmpty(request.Email) ? user.Email : request.Email;
    user.FirstName = string.IsNullOrEmpty(request.FirstName) ? user.FirstName : request.FirstName;
    user.LastName = string.IsNullOrEmpty(request.LastName) ? user.LastName : request.LastName;
    user.Address = string.IsNullOrEmpty(request.Address) ? user.Address : request.Address;
    user.PostalArea = string.IsNullOrEmpty(request.PostalArea) ? user.PostalArea : request.PostalArea;

    user.PostalCode = request.PostalCode is not > 0 ? user.PostalCode : request.PostalCode;
    user.PhoneNumber = request.PhoneNumber is not > 0 ? user.PhoneNumber : request.PhoneNumber;

    user.DOB = request.DOB ?? user.DOB;

    return user;
  }
}
