namespace restapi.Models
{
  public class Review
  {
    [Key]
    public Guid Id { get; set; } = new Guid();
    public string Status { get; set; } = "Under Review";
    public string? Text { get; set; } = string.Empty;
    [Required]
    public float Rating { get; set; }
    public string Image { get; set; } = string.Empty;
    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime? Updated { get; set; }

    public Guid LocationId { get; set; }
    public Location? Location { get; set; }
  }
}