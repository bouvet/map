namespace restapi.Dtos.Users;

public class UpdateUserDto
{
  public string Email { get; set; } = null!;
  public string Password { get; set; } = null!;
  public string Name { get; set; } = null!;
  public string Address { get; set; } = null!;
  public string PostalArea { get; set; } = null!;
  public int PostalCode { get; set; } = 0;
  public int BirthYear { get; set; } = 0;
}