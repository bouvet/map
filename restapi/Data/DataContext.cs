using Microsoft.EntityFrameworkCore;
using PrivateImageCloud.Api.Common.Persistence;
using restapi.Entities;

namespace restapi.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasMany(user => user.Roles).WithMany(r => r.Users);
        modelBuilder.Entity<User>().HasMany(user => user.FavoriteCategories).WithMany(category => category.Users);
        modelBuilder.Entity<User>().HasOne(user => user.OriginalProfileImage);
        modelBuilder.Entity<User>().HasOne(user => user.WebpProfileImage);
        modelBuilder.Entity<User>().Navigation(user => user.FavoriteCategories).AutoInclude();
        modelBuilder.Entity<User>().Navigation(user => user.Roles).AutoInclude();
        modelBuilder.Entity<User>().HasMany(user => user.Sessions);

        modelBuilder.Entity<Role>().HasOne(role => role.Creator);
        modelBuilder.Entity<Role>().HasOne(role => role.Editor);

        modelBuilder.Entity<Review>().HasOne(review => review.Creator);
        modelBuilder.Entity<Review>().HasOne(review => review.Editor);
        modelBuilder.Entity<Review>().HasOne(review => review.OriginalImage);
        modelBuilder.Entity<Review>().HasOne(review => review.WebpImage);
        modelBuilder.Entity<Review>().HasOne(review => review.Location).WithMany(l => l.Reviews);
        // modelBuilder.Entity<Review>().Navigation(review => review.Creator).AutoInclude();
        // modelBuilder.Entity<Review>().Navigation(review => review.Editor).AutoInclude();
        modelBuilder.Entity<Review>().Navigation(review => review.OriginalImage).AutoInclude();
        modelBuilder.Entity<Review>().Navigation(review => review.WebpImage).AutoInclude();

        modelBuilder.Entity<Category>().HasOne(c => c.Creator);
        modelBuilder.Entity<Category>().HasOne(c => c.Editor);

        // modelBuilder.Entity<Location>().HasOne(location => location.Creator);
        // modelBuilder.Entity<Location>().HasOne(location => location.Editor);
        modelBuilder.Entity<Location>().HasOne(location => location.OriginalImage);
        modelBuilder.Entity<Location>().HasOne(location => location.WebpImage);
        // modelBuilder.Entity<Location>().Navigation(location => location.Creator).AutoInclude();
        // modelBuilder.Entity<Location>().Navigation(location => location.Editor).AutoInclude();
        modelBuilder.Entity<Location>().Navigation(location => location.Categories).AutoInclude();
        modelBuilder.Entity<Location>().Navigation(location => location.Reviews).AutoInclude();
        modelBuilder.Entity<Location>().Navigation(location => location.OriginalImage).AutoInclude();
        modelBuilder.Entity<Location>().Navigation(location => location.WebpImage).AutoInclude();

        modelBuilder.Entity<Image>().HasOne(image => image.Uploader);
        // modelBuilder.Entity<Image>().Navigation(image => image.Uploader).AutoInclude();

        modelBuilder.Entity<Session>().HasOne(session => session.Location);
        modelBuilder.Entity<Session>().HasOne(session => session.User);
        modelBuilder.Entity<Session>().Navigation(session => session.Location).AutoInclude();

        modelBuilder.Seed();
    }

    public DbSet<Location> Locations => Set<Location>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Image> Images => Set<Image>();
    public DbSet<Email> Emails => Set<Email>();
    public DbSet<Session> Sessions => Set<Session>();
}