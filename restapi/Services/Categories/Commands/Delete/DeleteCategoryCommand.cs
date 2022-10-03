using ErrorOr;
using MediatR;

namespace restapi.Services.Categories.Commands.Delete;

public record DeleteCategoryCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;