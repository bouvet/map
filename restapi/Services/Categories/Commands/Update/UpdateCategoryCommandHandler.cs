using ErrorOr;
using MediatR;
using restapi.Common.Providers;
using restapi.Data;
using restapi.Models;

namespace restapi.Services.Categories.Commands.Update;

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, ErrorOr<Updated>>
{
  private readonly DataContext dataContext;
  private readonly IDateTimeProvider dateTimeProvider;

  public UpdateCategoryCommandHandler(DataContext dataContext, IDateTimeProvider dateTimeProvider)
  {
    this.dataContext = dataContext;
    this.dateTimeProvider = dateTimeProvider;
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
    category.Updated = dateTimeProvider.CEST;

    if (request.UserId is not null)
    {
      var user = await dataContext.Users.FindAsync(new object?[] { request.UserId }, cancellationToken: cancellationToken);

      if (user is not null)
      {
        category.Editor = user;
      }
    }

    await dataContext.SaveChangesAsync(cancellationToken);

    return Result.Updated;
  }
}
