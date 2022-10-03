using ErrorOr;
using MediatR;

namespace restapi.Services.Reviews.Commands.Delete;

public record DeleteReviewCommand(Guid Id) : IRequest<ErrorOr<Deleted>>;