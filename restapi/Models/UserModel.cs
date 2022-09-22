using System.ComponentModel.DataAnnotations;

namespace restapi.Models;

public class User
{
  public const int MinPasswordLength = 5;

  [Key]
  public Guid Id { get; set; }
  public string Email { get; set; } = null!;
  public string Password { get; set; } = null!;
  public string Name { get; set; } = string.Empty;
  public string Address { get; set; } = string.Empty;
  public string PostalArea { get; set; } = string.Empty;
  public int PostalCode { get; set; } = 0;
  public int BirthYear { get; set; } = 0;
}