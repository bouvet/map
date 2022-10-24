using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Services.Auth;
using restapi.Data;
using restapi.Services.Users.Common;

namespace restapi.Services.Users.Queries.GetUserById;

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, ErrorOr<UserResult>>
{
  private readonly DataContext dataContext;
  private readonly IJwtGenerator jwtGenerator;

  public GetUserByIdQueryHandler(DataContext dataContext, IJwtGenerator jwtGenerator)
  {
    this.dataContext = dataContext;
    this.jwtGenerator = jwtGenerator;
  }

  public async Task<ErrorOr<UserResult>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
  {
    var user = await dataContext
      .Users
      .Include(user => user.Roles)
      .ThenInclude(role => role.Creator)
      .Include(user => user.Roles)
      .ThenInclude(role => role.Editor)
      .SingleOrDefaultAsync(user => user.Id == request.Id, cancellationToken: cancellationToken);

    if (user is null)
    {
      return Errors.User.NotFound;
    }

    var token = "";

    if (user.Id == request.UserId)
    {
      token = jwtGenerator.GenerateUserToken(user);
    }

    return new UserResult(user, token);
  }
}
