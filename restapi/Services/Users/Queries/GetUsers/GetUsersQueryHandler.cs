using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Entities;
using restapi.Services.Users.Common;

namespace restapi.Services.Users.Queries.GetUsers;

public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, ErrorOr<List<UserResult>>>
{
  private readonly DataContext dataContext;

  public GetUsersQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<List<UserResult>>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
  {
    var users = await dataContext
      .Users
      .Include(user => user.OriginalProfileImage)
      .Include(user => user.WebpProfileImage)
      .ToListAsync(cancellationToken: cancellationToken);

    var userResultList = new List<UserResult>();

    foreach (User user in users)
    {
      userResultList.Add(new UserResult(user));
    }

    return userResultList;
  }
}
