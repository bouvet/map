using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Contracts.Categories;
using restapi.Data;
using restapi.Models;

namespace restapi.Services.Categories.Queries.GetCategories;

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, ErrorOr<List<Category>>>
{
  private readonly DataContext dataContext;

  public GetCategoriesQueryHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<List<Category>>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
  {
    return await dataContext.Categories.ToListAsync(cancellationToken: cancellationToken);
  }
}
