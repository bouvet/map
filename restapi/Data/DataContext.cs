namespace restapi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Location>().Navigation(location => location.Categories).AutoInclude();
    }

    public DbSet<Location> Locations { get; set; }
    public DbSet<Category> Categories { get; set; }
  }


}