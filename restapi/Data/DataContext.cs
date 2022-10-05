using Microsoft.EntityFrameworkCore;
using restapi.Models;

namespace restapi.Data;

public class DataContext : DbContext
{
  public DataContext(DbContextOptions<DataContext> options) : base(options) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<User>().HasMany(user => user.Roles).WithMany(r => r.Users);
    modelBuilder.Entity<User>().HasMany(user => user.FavoriteCategories).WithMany(category => category.Users);
    modelBuilder.Entity<User>().Navigation(user => user.FavoriteCategories).AutoInclude();
    modelBuilder.Entity<User>().Navigation(user => user.Roles).AutoInclude();

    modelBuilder.Entity<Role>().HasOne(role => role.Creator);
    modelBuilder.Entity<Role>().HasOne(role => role.Editor);

    modelBuilder.Entity<Review>().HasOne(review => review.Creator);
    modelBuilder.Entity<Review>().HasOne(review => review.Editor);
    modelBuilder.Entity<Review>().HasOne(review => review.Location).WithMany(l => l.Reviews);
    modelBuilder.Entity<Review>().Navigation(review => review.Creator).AutoInclude();
    modelBuilder.Entity<Review>().Navigation(review => review.Editor).AutoInclude();

    modelBuilder.Entity<Category>().HasOne(c => c.Creator);
    modelBuilder.Entity<Category>().HasOne(c => c.Editor);

    modelBuilder.Entity<Location>().HasOne(location => location.Creator);
    modelBuilder.Entity<Location>().HasOne(location => location.Editor);
    modelBuilder.Entity<Location>().Navigation(location => location.Creator).AutoInclude();
    modelBuilder.Entity<Location>().Navigation(location => location.Editor).AutoInclude();
    modelBuilder.Entity<Location>().Navigation(location => location.Categories).AutoInclude();
    modelBuilder.Entity<Location>().Navigation(location => location.Reviews).AutoInclude();
  }

  public DbSet<Location> Locations => Set<Location>();
  public DbSet<Category> Categories => Set<Category>();
  public DbSet<Review> Reviews => Set<Review>();
  public DbSet<User> Users => Set<User>();
  public DbSet<Role> Roles => Set<Role>();
}