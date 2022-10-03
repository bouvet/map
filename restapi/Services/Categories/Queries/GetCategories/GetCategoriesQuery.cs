using ErrorOr;
using MediatR;
using restapi.Services.Categories.Common;

namespace restapi.Services.Categories.Queries.GetCategories;

public record GetCategoriesQuery() : IRequest<ErrorOr<List<CategoryResult>>>;