namespace restapi.Dtos.Location
{
  public class ChangePropertiesDto
  {
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public string Status { get; set; } = "Under Review";
    public int Rating { get; set; }
    public List<int> CategoryIds { get; set; } = new List<int>();
  }
}