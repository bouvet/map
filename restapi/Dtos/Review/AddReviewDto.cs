namespace restapi.Dtos
{
  public class AddReviewDto
  {
    public float Rating { get; set; }
    public string Text { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
    public Guid LocationId { get; set; }
  }
}