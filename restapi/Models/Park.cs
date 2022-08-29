using System.ComponentModel.DataAnnotations;

namespace restapi.Models
{
  public class Park
  {
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    [Required]
    public double Latitude { get; set; }
    [Required]
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