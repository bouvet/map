using ErrorOr;
using MediatR;
using restapi.Data;

namespace restapi.Services.Categories.Commands.Delete;

public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, ErrorOr<Deleted>>
{
  public readonly DataContext dataContext;

  public DeleteCategoryCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Deleted>> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
  {
    var category = await dataContext.Categories.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (category is null)
    {
      return Errors.Category.NotFound;
    }

    var locationsWhereCategoryIsUsed = dataContext.Entry(category).Collection(c => c.Locations).Query().AsEnumerable().ToList();

    if (locationsWhereCategoryIsUsed.Count > 0)
    {
      return Errors.Category.UsedByLocations;
    }

    dataContext.Categories.Remove(category);
    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Deleted;
  }
}