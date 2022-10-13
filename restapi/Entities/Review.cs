using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace restapi.Entities;

public class Review
{
  public const int MinRatingValue = 1;
  public const int MaxRatingValue = 5;

  [Key]
  public Guid Id { get; set; } = new Guid();
  public string Status { get; set; } = "Under Review";
  public string? Text { get; set; } = string.Empty;
  public float Rating { get; set; }
  public DateTime Created { get; set; }
  public DateTime? Updated { get; set; }
  public User? Creator { get; set; }
  public User? Editor { get; set; }
  public Guid LocationId { get; set; }
  public Location? Location { get; set; }

  [ForeignKey("OriginalImageId")]
  public Image? OriginalImage { get; set; }

  [ForeignKey("WebpImageId")]
  public Image? WebpImage { get; set; }
}