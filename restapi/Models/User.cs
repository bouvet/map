using System.ComponentModel.DataAnnotations;

namespace restapi.Models;

public class User
{
  public const int MinPasswordLength = 8;

  [Key]
  public Guid Id { get; set; }
  public string Email { get; set; } = null!;
  public string Password { get; set; } = null!;
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public string? Address { get; set; }
  public string? PostalArea { get; set; }
  public int PostalCode { get; set; }
  public int PhoneNumber { get; set; }
  public DateTime? DOB { get; set; }
  public List<Role> Roles { get; set; } = new List<Role>();
}