namespace restapi.Dtos.Reviews;

public class AddReviewDto
{
  public float Rating { get; set; }
  public string? Text { get; set; }
  public IFormFile? Image { get; set; }
  public Guid LocationId { get; set; }
}