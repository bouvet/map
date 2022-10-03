using ErrorOr;
using MediatR;
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
    var category = await dataContext.Categories.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (category is null)
    {
      return Errors.Category.NotFound;
    }

    return new CategoryResult(category);
  }
}
