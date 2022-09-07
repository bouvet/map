namespace restapi.Dtos
{
  public class LocationResponseDto
  {
    [Key]
    public Guid Id { get; set; } = new Guid();
    public string Type { get; set; } = "Feature";
    public LocationPropertiesDto Properties { get; set; } = new LocationPropertiesDto { };
    public LocationGeometryDto Geometry { get; set; } = new LocationGeometryDto { };
  }
}
