namespace VerdenVenter.Dtos
{
  public class UpdateReviewDto
  {
    public Guid Id { get; set; }
    public string? Status { get; set; }
    public string? Text { get; set; }
    public float Rating { get; set; }
    public IFormFile? Image { get; set; }
    public Guid? LocationId { get; set; }
  }
}