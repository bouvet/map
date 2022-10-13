using System.ComponentModel.DataAnnotations;

namespace restapi.Entities;

public class Image
{
  [Key]
  public Guid Id { get; set; }
  public Uri BlobUri { get; set; } = null!;
  public Uri CdnUri { get; set; } = null!;
  public string ContentType { get; set; } = null!;
  public DateTime Uploaded { get; set; }
  public User? Uploader { get; set; }
  public Guid? OriginalImageId { get; set; }
  public Guid? ReviewId { get; set; }
  public Guid? LocationId { get; set; }
}