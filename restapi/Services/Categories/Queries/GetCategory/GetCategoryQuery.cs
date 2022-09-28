using ErrorOr;
using MediatR;
using restapi.Services.Categories.Common;

namespace restapi.Services.Categories.Queries.GetCategory;

public record GetCategoryQuery(Guid Id) : IRequest<ErrorOr<CategoryResult>>;