using System.Runtime.InteropServices;
namespace restapi.Dtos
{
  public class AddReviewDto
  {
    public float Rating { get; set; }
    public string? Text { get; set; }
    public IFormFile? Image { get; set; }
    public Guid LocationId { get; set; }
  }
}