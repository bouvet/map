namespace restapi.Dtos
{
  public class AddPropertyDto
  {
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public int Rating { get; set; }
  }
}