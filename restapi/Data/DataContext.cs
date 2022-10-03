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
<<<<<<< HEAD

    modelBuilder.Entity<User>().Navigation(user => user.Roles).AutoInclude();
=======
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e
  }

  public DbSet<Location> Locations => Set<Location>();
  public DbSet<Category> Categories => Set<Category>();
  public DbSet<Review> Reviews => Set<Review>();
  public DbSet<User> Users => Set<User>();
<<<<<<< HEAD
  public DbSet<Role> Roles => Set<Role>();
=======
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e
}