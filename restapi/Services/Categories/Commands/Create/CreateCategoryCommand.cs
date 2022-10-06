using ErrorOr;
using MediatR;
using restapi.Services.Categories.Common;

namespace restapi.Services.Categories.Commands.Create;

public record CreateCategoryCommand(
  string Name,
  string Emoji,
  Guid? UserId
) : IRequest<ErrorOr<CategoryResult>>;