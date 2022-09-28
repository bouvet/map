using ErrorOr;
using MediatR;
using restapi.Models;

namespace restapi.Services.Categories.Queries.GetCategories;

public record GetCategoriesQuery() : IRequest<ErrorOr<List<Category>>>;