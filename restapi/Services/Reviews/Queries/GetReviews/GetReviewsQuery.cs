using ErrorOr;
using MediatR;
using restapi.Services.Reviews.Common;

namespace restapi.Services.Reviews.Queries.GetReviews;

public record GetReviewsQuery(Guid LocationId) : IRequest<ErrorOr<List<ReviewResult>>>;