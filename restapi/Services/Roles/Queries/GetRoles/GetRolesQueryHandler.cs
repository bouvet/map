using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Services.Mappers.Roles;
using restapi.Data;
using restapi.Services.Roles.Common;

namespace restapi.Services.Roles.Queries.GetRoles;

public class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, ErrorOr<List<RoleResult>>>
{
  private readonly DataContext dataContext;
  private readonly IRoleMapper roleMapper;

  public GetRolesQueryHandler(DataContext dataContext, IRoleMapper roleMapper)
  {
    this.dataContext = dataContext;
    this.roleMapper = roleMapper;
  }

  public async Task<ErrorOr<List<RoleResult>>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
  {
    var roles = await dataContext.Roles.Include(role => role.Creator).Include(role => role.Editor).ToListAsync(cancellationToken: cancellationToken);

    return roleMapper.MapDbListToResultList(roles);
  }
}
