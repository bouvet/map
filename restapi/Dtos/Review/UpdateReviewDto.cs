namespace restapi.Dtos
{
  public class UpdateReviewDto
  {
    public string Status { get; set; } = "Under Review";
    public string Text { get; set; } = string.Empty;
    public float Rating { get; set; }
    public IFormFile? Image { get; set; }
    public Guid LocationId { get; set; }
  }
}