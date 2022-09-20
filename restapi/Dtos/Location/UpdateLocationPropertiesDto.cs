namespace restapi.Dtos
{
  public class UpdateLocationPropertiesDto
  {
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public IFormFile? Img { get; set; }
    public string Status { get; set; } = null!;
    public List<Guid>? Category { get; set; }
  }
}