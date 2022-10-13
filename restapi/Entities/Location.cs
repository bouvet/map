using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace restapi.Entities;

public class Location
{
  public const int MinTitleLength = 5;
  public const int MaxTitleLength = 30;
  public const int MinDescriptionLength = 20;
  public const int MaxDescriptionLength = 200;
  public const int MinLongitudeValue = 5;
  public const int MaxLongitudeValue = 6;
  public const int MinLatitudeValue = 58;
  public const int MaxLatitudeValue = 59;

  [Key]
  public Guid Id { get; set; } = new Guid();
  public string Title { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public float Rating { get; set; }
  public double Longitude { get; set; }
  public double Latitude { get; set; }
  public string Status { get; set; } = "Under Review";
  public User? Creator { get; set; }
  public User? Editor { get; set; }
  public List<Category> Categories { get; set; } = new List<Category>();

  [JsonIgnore]
  public List<Review> Reviews { get; set; } = new List<Review>();

  [ForeignKey("OriginalImageId")]
  public Image? OriginalImage { get; set; }

  [ForeignKey("WebpImageId")]
  public Image? WebpImage { get; set; }
}