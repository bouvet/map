using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Services.Categories.Common;

namespace restapi.Services.Categories.Queries.GetCategories;

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, ErrorOr<List<CategoryResult>>>
{
  private readonly DataContext dataContext;

  public GetCategoriesQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<List<CategoryResult>>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
  {
    var categories = await dataContext.Categories.ToListAsync(cancellationToken: cancellationToken);

    var categoryResultList = new List<CategoryResult>();

    foreach (var category in categories)
    {
      categoryResultList.Add(new CategoryResult(category));
    }

    return categoryResultList;
  }
}
