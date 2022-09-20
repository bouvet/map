namespace VerdenVenter.Dtos
{
  public class ReviewDto
  {
    public Guid Id { get; set; } = new Guid();
    public string Status { get; set; } = "Under Review";
    public string Text { get; set; } = string.Empty;
    public float Rating { get; set; }
    public string? Image { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public Location? Location { get; set; }
  }
}