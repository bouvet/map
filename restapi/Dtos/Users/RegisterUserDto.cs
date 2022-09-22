namespace restapi.Dtos.Users;

public class RegisterUserDto
{
  public string Email { get; set; } = null!;
  public string Password { get; set; } = null!;
  public string Name { get; set; } = string.Empty;
  public string Address { get; set; } = string.Empty;
  public string PostalArea { get; set; } = string.Empty;
  public int PostalCode { get; set; }
  public int BirthYear { get; set; }
}