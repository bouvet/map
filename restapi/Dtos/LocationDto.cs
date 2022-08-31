namespace restapi.Dtos
{
  public class LocationDto
  {
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public int Rating { get; set; }
    [Required]
    public double Latitude { get; set; }
    [Required]
    public double Longitude { get; set; }
    public ICollection<Category>? Categories { get; set; }

  }

  public class AddLoctionDto
  {
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public int Rating { get; set; }
    [Required]
    public double Latitude { get; set; }
    [Required]
    public double Longitude { get; set; }
    public List<int>? CategoryIds { get; set; }
  }

  public class LocationResponseDto
  {
    public string Type { get; set; } = "Feature";
    public Properties? Properties { get; set; }
    public Geometry? Geometry { get; set; }
  }

  public class Properties
  {
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<Category> Category { get; set; } = new List<Category>();
    public string Img { get; set; } = string.Empty;
    public int Rating { get; set; }
  }

  public class Geometry
  {
    public double[]? Coordinates { get; set; }
    public string Type { get; set; } = "Point";
  }
}

/*
[
  {
    type: "Feature",
    properties: {
      title: "",
      description: "",
      category: [],
      img: "",
      rating: int
    },
    geometry: {
      coordinates: [double, double],
      type: "Point"
    }
  }
]
*/
