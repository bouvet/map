namespace api.Models
{
    public class CategoryItemDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }


    public class LocationItemDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        //public string[] category { get; set; } this should be its own table
        public double Latitude { get; set; }
        public double Longitude { get; set; }

    }

}
