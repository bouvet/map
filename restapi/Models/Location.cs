namespace restapi.Models
{
  public class Location
  {
    public int Id { get; set; }
    public string Type { get; set; } = "Feature";
    public Property? Properties { get; set; }
    // public Geometry Geometry { get; set; }
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