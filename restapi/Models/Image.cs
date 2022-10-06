using System.ComponentModel.DataAnnotations;

namespace restapi.Models;

public class Image
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = null!;
  public Uri BlobUri { get; set; } = null!;
  public Uri CdnUri { get; set; } = null!;
  public string ContentType { get; set; } = null!;
  public DateTime Uploaded { get; set; }
  public User? Uploader { get; set; }
}