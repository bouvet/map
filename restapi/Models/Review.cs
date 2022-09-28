using System.ComponentModel.DataAnnotations;

namespace restapi.Models;

public class Review
{
  public const int MinRatingValue = 1;
  public const int MaxRatingValue = 5;

  [Key]
  public Guid Id { get; set; } = new Guid();
  public string Status { get; set; } = "Under Review";
  public string? Text { get; set; } = string.Empty;
  public float Rating { get; set; }
  public string Image { get; set; } = string.Empty;
  public DateTime Created { get; set; }
  public DateTime? Updated { get; set; }

  public Guid LocationId { get; set; }
  public Location? Location { get; set; }
}