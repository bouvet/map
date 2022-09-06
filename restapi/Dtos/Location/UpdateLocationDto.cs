namespace restapi.Dtos.Location
{
  public class UpdateLocationDto
  {
    public string Type { get; set; } = "Feature";
    public LocationPropertiesDto Properties { get; set; } = new LocationPropertiesDto { };
    public LocationGeometryDto Geometry { get; set; } = new LocationGeometryDto { };
  }
}