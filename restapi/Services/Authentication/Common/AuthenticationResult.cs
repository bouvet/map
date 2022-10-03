<<<<<<< HEAD
using restapi.Models;

namespace restapi.Services.Authentication.Common;

public record AuthenticationResult(
  User User,
  string Token
=======
namespace restapi.Services.Authentication.Common;

public record AuthenticationResult(
  Guid Id,
  string Email,
  string Name,
  string Address,
  string PostalArea,
  string Token,
  int PostalCode,
  int BirthYear
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e
);