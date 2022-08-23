namespace api.Models
{

    public class CategoryItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }


    public class LocationItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        //public string[] category { get; set; } this should be its own table
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