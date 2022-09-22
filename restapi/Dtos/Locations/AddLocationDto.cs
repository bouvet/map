namespace restapi.Dtos.Locations;

public class AddLocationDto
{
  public string Title { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public IFormFile? Image { get; set; }
  public double Longitude { get; set; }
  public double Latitude { get; set; }
  public List<Guid> Category { get; set; } = new List<Guid>();
}