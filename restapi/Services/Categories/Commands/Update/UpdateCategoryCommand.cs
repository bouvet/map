using ErrorOr;
using MediatR;

namespace restapi.Services.Categories.Commands.Update;

public record UpdateCategoryCommand(
  Guid Id,
  string Name,
  string Emoji
) : IRequest<ErrorOr<Updated>>;