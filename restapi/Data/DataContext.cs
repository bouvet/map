namespace restapi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Location> Locations { get; set; }
    public DbSet<Category> Categories { get; set; }
  }
}