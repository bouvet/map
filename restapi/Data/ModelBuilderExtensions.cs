using Microsoft.EntityFrameworkCore;
using restapi.Entities;

namespace PrivateImageCloud.Api.Common.Persistence;

public static class ModelBuilderExtensions
{
  public static void Seed(this ModelBuilder modelBuilder)
  {
    var currentTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"));

    modelBuilder.Entity<Role>().HasData(
      new Role
      {
        Id = Guid.NewGuid(),
        Created = currentTime,
        Name = "Administrator"
      },
      new Role
      {
        Id = Guid.NewGuid(),
        Created = currentTime,
        Name = "Registering"
      },
      new Role
      {
        Id = Guid.NewGuid(),
        Created = currentTime,
        Name = "User"
      }
    );

    modelBuilder.Entity<User>().HasData(
      new User
      {
        Id = Guid.NewGuid(),
        Email = "verden.venter.app@gmail.com",
        Password = BCrypt.Net.BCrypt.HashPassword("123123123"),
        FirstName = "Verden",
        LastName = "Venter",
        Registered = currentTime,
        AccessToken = "Admin",
        DOB = currentTime
      },
      new User
      {
        Id = Guid.NewGuid(),
        Email = "jdoe@email.com",
        Password = BCrypt.Net.BCrypt.HashPassword("123123123"),
        FirstName = "John",
        LastName = "Doe",
        Registered = currentTime,
        DOB = currentTime
      }
    );
  }
}