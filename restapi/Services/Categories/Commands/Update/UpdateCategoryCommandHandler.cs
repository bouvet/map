using ErrorOr;
using MediatR;
using restapi.Data;
using restapi.Models;

namespace restapi.Services.Categories.Commands.Update;

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, ErrorOr<Updated>>
{
  private readonly DataContext dataContext;

  public UpdateCategoryCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<Updated>> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
  {
    List<Error> errors = new();

    var category = await dataContext.Categories.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

    if (category == null)
    {
      return Errors.Category.NotFound;
    }

    if (request.Name.Length is < Category.MinNameLength or > Category.MaxNameLength)
    {
      errors.Add(Errors.Category.InvalidName);
    }

    if (string.IsNullOrEmpty(request.Emoji))
    {
      errors.Add(Errors.Category.InvalidEmoji);
    }

    if (errors.Count > 0)
    {
      return errors;
    }

    category.Name = request.Name;
    category.Emoji = request.Emoji;

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Updated;
  }
}