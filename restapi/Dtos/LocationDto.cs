namespace restapi.Dtos
{
  public class UpdateLocationDto
  {
    public string Type { get; set; } = "Feature";
    public Properties Properties { get; set; } = new Properties { };
    public Geometry Geometry { get; set; } = new Geometry { };
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
    public double Longitude { get; set; }
    [Required]
    public double Latitude { get; set; }
    public List<int> CategoryIds { get; set; } = new List<int>();
  }

  public class LocationResponseDto
  {
    public int Id { get; set; }
    public string Type { get; set; } = "Feature";
    public Properties Properties { get; set; } = new Properties { };
    public Geometry Geometry { get; set; } = new Geometry { };
  }

  public class Properties
  {
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public string Status { get; set; } = "Under Review";
    public int Rating { get; set; }
    public List<Category> Category { get; set; } = new List<Category>();
  }

  public class Geometry
  {
    // Longitude, Latitude
    public double[] Coordinates { get; set; } = Array.Empty<double>();
    public string Type { get; set; } = "Point";
  }

  public class ChangeProperties
  {
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public string Status { get; set; } = "Under Review";
    public int Rating { get; set; }
    public List<int> CategoryIds { get; set; } = new List<int>();
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
      status: "",
      rating: int
    },
    geometry: {
      coordinates: [double, double],
      type: "Point"
    }
  }
]
*/
