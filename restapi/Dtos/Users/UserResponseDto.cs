namespace restapi.Dtos.Users;

public class UserResponseDto
{
  public Guid Id { get; set; }
  public string Email { get; set; } = null!;
  public string Name { get; set; } = null!;
  public string Address { get; set; } = null!;
  public string PostalArea { get; set; } = null!;
  public string Token { get; set; } = string.Empty;
  public int PostalCode { get; set; }
  public int BirthYear { get; set; }
}