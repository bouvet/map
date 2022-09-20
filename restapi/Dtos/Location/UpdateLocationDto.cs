namespace VerdenVenter.Dtos
{
  public class UpdateLocationDto
  {
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public IFormFile? Img { get; set; }
    public string Status { get; set; } = null!;
    public List<Guid>? Category { get; set; }
    public double Longitude { get; set; }
    public double Latitude { get; set; }
  }
}