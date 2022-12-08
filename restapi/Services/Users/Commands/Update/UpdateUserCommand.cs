using ErrorOr;
using MediatR;

namespace restapi.Services.Users.Commands.Update;

public record UpdateUserCommand(
  Guid Id,
  string? FirstName,
  string? LastName,
  string? Address,
  string? PostalArea,
  int PostalCode,
  int PhoneNumber,
  bool? DeleteProfileImage,
  DateTime? DOB,
  List<Guid>? FavoriteCategoryIds,
  IFormFile? ProfileImage
) : IRequest<ErrorOr<Updated>>;