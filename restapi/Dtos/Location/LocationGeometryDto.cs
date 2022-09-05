namespace restapi.Dtos.Location
{
  public class LocationGeometryDto
  {
    // Longitude, Latitude
    public double[] Coordinates { get; set; } = Array.Empty<double>();
    public string Type { get; set; } = "Point";
  }
}