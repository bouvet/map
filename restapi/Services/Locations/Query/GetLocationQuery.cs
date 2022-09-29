using ErrorOr;
using MediatR;
using restapi.Services.Locations.Common;

namespace restapi.Services.Locations.Query;

public record GetLocationQuery(Guid Id) : IRequest<ErrorOr<LocationResult>>;