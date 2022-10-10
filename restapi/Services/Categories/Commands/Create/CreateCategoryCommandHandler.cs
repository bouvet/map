using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using restapi.Common.Providers;
using restapi.Data;
using restapi.Models;

namespace restapi.Services.Categories.Commands.Create;

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, ErrorOr<Common.CategoryResult>>
{
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;

  public CreateCategoryCommandHandler(DataContext dataContext, IDateTimeProvider dateTimeProvider)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
  }

  public async Task<ErrorOr<Common.CategoryResult>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
  {
    List<Error> errors = new();

    var categoryAlreadyExists = await dataContext.Categories.AnyAsync(c => c.Name == request.Name, cancellationToken);

    if (categoryAlreadyExists)
    {
      return Errors.Category.AlreadyExists;
    }

    if (request.Name.Length is < Models.Category.MinNameLength or > Models.Category.MaxNameLength)
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

    var category = new Category
    {
      Name = request.Name,
      Emoji = request.Emoji,
      Created = dateTimeProvider.CEST
    };

    if (request.UserId is not null)
    {
      var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

      if (user is not null)
      {
        category.Creator = user;
      }
    }

    dataContext.Categories.Add(category);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new Common.CategoryResult(category);
  }
}