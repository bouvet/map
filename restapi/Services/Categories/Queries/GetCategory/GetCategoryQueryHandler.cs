using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Services.Categories.Common;

namespace restapi.Services.Categories.Queries.GetCategory;

public class GetCategoryQueryHandler : IRequestHandler<GetCategoryQuery, ErrorOr<CategoryResult>>
{
  private readonly DataContext dataContext;

  public GetCategoryQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<CategoryResult>> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
  {
    var category = await dataContext.Categories.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (category is null)
    {
      return Errors.Category.NotFound;
    }

    return new CategoryResult(category);
  }
}
