using ErrorOr;
using MediatR;
using restapi.Services.Categories.Common;

namespace restapi.Services.Categories.Queries.GetCategoryById;

public record GetCategoryByIdQuery(Guid Id) : IRequest<ErrorOr<CategoryResult>>;