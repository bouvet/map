namespace VerdenVenter.Models
{
  public class User
  {
    public Guid Id { get; set; } = new Guid();
    [Required]
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public int PostalCode { get; set; } = 0;
    public string PostalArea { get; set; } = string.Empty;
    public int BirthYear { get; set; } = 0;
  }
}