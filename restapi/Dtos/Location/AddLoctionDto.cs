namespace restapi.Dtos
{
  public class AddLoctionDto
  {
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public float Rating { get; set; }
    public double Longitude { get; set; }
    public double Latitude { get; set; }
    public List<String> Category { get; set; } = new List<String>();
  }
}