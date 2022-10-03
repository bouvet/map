using Microsoft.EntityFrameworkCore;
using restapi.Models;

namespace restapi.Data;

public class DataContext : DbContext
{
  public DataContext(DbContextOptions<DataContext> options) : base(options) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Review>().HasOne(r => r.Location).WithMany(l => l.Reviews);

    modelBuilder.Entity<Location>().Navigation(location => location.Categories).AutoInclude();

    modelBuilder.Entity<Location>().Navigation(location => location.Reviews).AutoInclude();

    modelBuilder.Entity<User>().Navigation(user => user.Roles).AutoInclude();
  }

  public DbSet<Location> Locations => Set<Location>();
  public DbSet<Category> Categories => Set<Category>();
  public DbSet<Review> Reviews => Set<Review>();
  public DbSet<User> Users => Set<User>();
  public DbSet<Role> Roles => Set<Role>();
}