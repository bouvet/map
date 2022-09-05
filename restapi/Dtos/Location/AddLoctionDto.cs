namespace restapi.Dtos.Location
{
  public class AddLoctionDto
  {
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public int Rating { get; set; }
    [Required]
    public double Longitude { get; set; }
    [Required]
    public double Latitude { get; set; }
    public List<int> CategoryIds { get; set; } = new List<int>();
  }
}