﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using restapi.Data;

#nullable disable

namespace restapi.Migrations
{
  [DbContext(typeof(DataContext))]
  [Migration("20220927130150_UserRole")]
  partial class UserRole
  {
    protected override void BuildTargetModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
      modelBuilder
          .HasAnnotation("ProductVersion", "6.0.8")
          .HasAnnotation("Relational:MaxIdentifierLength", 128);

      SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

      modelBuilder.Entity("CategoryLocation", b =>
          {
            b.Property<Guid>("CategoriesId")
                      .HasColumnType("uniqueidentifier");

            b.Property<Guid>("LocationsId")
                      .HasColumnType("uniqueidentifier");

            b.HasKey("CategoriesId", "LocationsId");

            b.HasIndex("LocationsId");

            b.ToTable("CategoryLocation");
          });

      modelBuilder.Entity("restapi.Models.Category", b =>
          {
            b.Property<Guid>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("uniqueidentifier");

            b.Property<string>("Emoji")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Name")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.HasKey("Id");

            b.ToTable("Categories");
          });

      modelBuilder.Entity("restapi.Models.Location", b =>
          {
            b.Property<Guid>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("uniqueidentifier");

            b.Property<string>("Description")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Image")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<double>("Latitude")
                      .HasColumnType("float");

            b.Property<double>("Longitude")
                      .HasColumnType("float");

            b.Property<float>("Rating")
                      .HasColumnType("real");

            b.Property<string>("Status")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Title")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.HasKey("Id");

            b.ToTable("Locations");
          });

      modelBuilder.Entity("restapi.Models.Review", b =>
          {
            b.Property<Guid>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("uniqueidentifier");

            b.Property<DateTime>("Created")
                      .HasColumnType("datetime2");

            b.Property<string>("Image")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<Guid>("LocationId")
                      .HasColumnType("uniqueidentifier");

            b.Property<float>("Rating")
                      .HasColumnType("real");

            b.Property<string>("Status")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Text")
                      .HasColumnType("nvarchar(max)");

            b.Property<DateTime?>("Updated")
                      .HasColumnType("datetime2");

            b.HasKey("Id");

            b.HasIndex("LocationId");

            b.ToTable("Reviews");
          });

      modelBuilder.Entity("restapi.Models.Role", b =>
          {
            b.Property<Guid>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("uniqueidentifier");

            b.Property<string>("Name")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.HasKey("Id");

            b.ToTable("Roles");
          });

      modelBuilder.Entity("restapi.Models.User", b =>
          {
            b.Property<Guid>("Id")
                      .ValueGeneratedOnAdd()
                      .HasColumnType("uniqueidentifier");

            b.Property<string>("Address")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<DateTime>("DOB")
                      .HasColumnType("datetime2");

            b.Property<string>("Email")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("FirstName")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("LastName")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<string>("Password")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<int>("PhoneNumber")
                      .HasColumnType("int");

            b.Property<string>("PostalArea")
                      .IsRequired()
                      .HasColumnType("nvarchar(max)");

            b.Property<int>("PostalCode")
                      .HasColumnType("int");

            b.HasKey("Id");

            b.ToTable("Users");
          });

      modelBuilder.Entity("RoleUser", b =>
          {
            b.Property<Guid>("RolesId")
                      .HasColumnType("uniqueidentifier");

            b.Property<Guid>("UsersId")
                      .HasColumnType("uniqueidentifier");

            b.HasKey("RolesId", "UsersId");

            b.HasIndex("UsersId");

            b.ToTable("RoleUser");
          });

      modelBuilder.Entity("CategoryLocation", b =>
          {
            b.HasOne("restapi.Models.Category", null)
                      .WithMany()
                      .HasForeignKey("CategoriesId")
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();

            b.HasOne("restapi.Models.Location", null)
                      .WithMany()
                      .HasForeignKey("LocationsId")
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();
          });

      modelBuilder.Entity("restapi.Models.Review", b =>
          {
            b.HasOne("restapi.Models.Location", "Location")
                      .WithMany("Reviews")
                      .HasForeignKey("LocationId")
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();

            b.Navigation("Location");
          });

      modelBuilder.Entity("RoleUser", b =>
          {
            b.HasOne("restapi.Models.Role", null)
                      .WithMany()
                      .HasForeignKey("RolesId")
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();

            b.HasOne("restapi.Models.User", null)
                      .WithMany()
                      .HasForeignKey("UsersId")
                      .OnDelete(DeleteBehavior.Cascade)
                      .IsRequired();
          });

      modelBuilder.Entity("restapi.Models.Location", b =>
          {
            b.Navigation("Reviews");
          });
#pragma warning restore 612, 618
    }
  }
}
