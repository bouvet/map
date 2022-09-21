using restapi.Models;

namespace restapi.Dtos
{
  public class LocationPropertiesDto
  {
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Status { get; set; } = "Under Review";
    public float Rating { get; set; }
    public List<Category> Category { get; set; } = new List<Category>();
  }
}