namespace restapi
{
  public class Park
  {
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public double Latitude { get; set; }

    public double Longitude { get; set; }
  }

}

/* typescript interface for location object
   
    export interface LocationData {
        [index: string]: any;
        latitude: number;
        longitude: number;
        name: string;
        description: string;
        category: Array<Category>;
    }
*/