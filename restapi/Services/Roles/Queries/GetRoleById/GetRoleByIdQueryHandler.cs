using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Services.Roles.Common;

namespace restapi.Services.Roles.Queries.GetRoleById;

public class GetRoleByIdQueryHandler : IRequestHandler<GetRoleByIdQuery, ErrorOr<RoleResult>>
{
  private readonly DataContext dataContext;

  public GetRoleByIdQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<RoleResult>> Handle(GetRoleByIdQuery request, CancellationToken cancellationToken)
  {
    var role = await dataContext.Roles.SingleOrDefaultAsync(r => r.Id == request.Id, cancellationToken: cancellationToken);

    if (role is null)
    {
      return Errors.Role.NotFound;
    }

    return new RoleResult(role);
  }
}
