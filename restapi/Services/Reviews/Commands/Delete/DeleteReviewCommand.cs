using ErrorOr;
using MediatR;
using restapi.Entities;

namespace restapi.Services.Reviews.Commands.Delete;

public record DeleteReviewCommand(Review Review) : IRequest<ErrorOr<Deleted>>;