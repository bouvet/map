using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Data;
using restapi.Models;
using restapi.Services.Categories.Common;
using restapi.ServiceUtils.ServiceErrors;

namespace restapi.Services.Categories.Commands.Create;

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, ErrorOr<CategoryResult>>
{
  private readonly DataContext dataContext;

  public CreateCategoryCommandHandler(DataContext dataContext)
  {
    this.dataContext = dataContext;
  }

  public async Task<ErrorOr<CategoryResult>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
  {
    List<Error> errors = new();

    var categoryAlreadyExists = await dataContext.Categories.AnyAsync(c => c.Name == request.Name, cancellationToken);

    if (categoryAlreadyExists)
    {
      return Errors.Category.AlreadyExists;
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

    var category = new Category { Name = request.Name, Emoji = request.Emoji };

    dataContext.Categories.Add(category);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new CategoryResult(category);
  }
}