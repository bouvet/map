namespace restapi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Review>().HasOne(r => r.Location).WithMany(l => l.Reviews);

      modelBuilder.Entity<Location>().Navigation(location => location.Categories).AutoInclude();

      modelBuilder.Entity<Location>().Navigation(location => location.Reviews).AutoInclude();

    }

    public DbSet<Location> Locations { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<User> Users { get; set; }
  }


}