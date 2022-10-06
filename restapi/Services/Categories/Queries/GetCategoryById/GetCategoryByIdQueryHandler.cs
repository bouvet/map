using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Services.Categories.Common;

namespace restapi.Services.Categories.Queries.GetCategoryById;

public class GetCategoryQueryHandler : IRequestHandler<GetCategoryByIdQuery, ErrorOr<CategoryResult>>
{
  private readonly DataContext dataContext;

  public GetCategoryQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<CategoryResult>> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
  {
    var category = await dataContext
      .Categories
      .Include(c => c.Creator)
      .Include(c => c.Editor)
      .SingleOrDefaultAsync(c => c.Id == request.Id, cancellationToken: cancellationToken);

    if (category is null)
    {
      return Errors.Category.NotFound;
    }

    return new CategoryResult(category);
  }
}
