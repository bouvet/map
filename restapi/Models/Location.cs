namespace restapi.Models
{
  public class Location
  {
    [Key]
    public Guid Id { get; set; } = new Guid();
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    [MinLength(1)]
    [MaxLength(5)]
    public float Rating { get; set; }
    [Required]
    public double Longitude { get; set; }
    [Required]
    public double Latitude { get; set; }
    public string Status { get; set; } = "Under Review";
    public List<Category> Categories { get; set; } = new List<Category>();
  }
}