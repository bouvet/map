using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Services.Roles.Common;

namespace restapi.Services.Roles.Queries.GetRoles;

public class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, ErrorOr<List<RoleResult>>>
{
  private readonly DataContext dataContext;

  public GetRolesQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<List<RoleResult>>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
  {
    var roles = await dataContext.Roles.ToListAsync(cancellationToken: cancellationToken);

    var mappedResultList = new List<RoleResult>();

    foreach (var role in roles)
    {
      mappedResultList.Add(new RoleResult(role));
    }

    return mappedResultList;
  }
}
