namespace restapi.Dtos
{
  public class UpdateLocationPropertiesDto
  {
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public string Status { get; set; } = "Under Review";
    public float Rating { get; set; }
    public List<Guid> Category { get; set; } = new List<Guid>();
  }
}