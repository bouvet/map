using Microsoft.EntityFrameworkCore;

namespace restapi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Park> Parks { get; set; }

    public DbSet<Category> Categories { get; set; }
  }
}