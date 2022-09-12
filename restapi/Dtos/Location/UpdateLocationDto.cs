namespace restapi.Dtos
{
  public class UpdateLocationDto
  {
    public string Type { get; set; } = "Feature";
    public UpdateLocationPropertiesDto Properties { get; set; } = new UpdateLocationPropertiesDto { };
    public LocationGeometryDto Geometry { get; set; } = new LocationGeometryDto { };
  }
}