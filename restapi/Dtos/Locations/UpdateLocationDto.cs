namespace restapi.Dtos.Locations;

public class UpdateLocationDto
{
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public string Description { get; set; } = null!;
  public IFormFile? Image { get; set; }
  public string Status { get; set; } = null!;
  public double Longitude { get; set; }
  public double Latitude { get; set; }
  public List<Guid>? Category { get; set; }
}