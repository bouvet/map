using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;


namespace api.Models
{
    public class CategoryContext : DbContext
    {
        public CategoryContext(DbContextOptions<CategoryContext> options) : base(options)
        {
        }

        public DbSet<CategoryItem> CategoryItems { get; set; } = null!;
    }


    public class LocationContext : DbContext
    {
        public LocationContext(DbContextOptions<LocationContext> options) : base(options)
        {
        }

        public DbSet<LocationItem> LocationItems { get; set; } = null!;
    }


}
