using ErrorOr;
using MediatR;
using restapi.Services.Reviews.Common;

namespace restapi.Services.Reviews.Queries.GetReviewById;

public record GetReviewByIdQuery(Guid Id) : IRequest<ErrorOr<ReviewResult>>;