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
    [Migration("20221028100655_DbSeed")]
    partial class DbSeed
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

            modelBuilder.Entity("CategoryUser", b =>
                {
                    b.Property<Guid>("FavoriteCategoriesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UsersId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("FavoriteCategoriesId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("CategoryUser");
                });

            modelBuilder.Entity("restapi.Entities.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("CreatorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("EditorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Emoji")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.HasIndex("EditorId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("restapi.Entities.Email", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CodeValidTo")
                        .HasColumnType("datetime2");

                    b.Property<int>("ConfirmationCode")
                        .HasColumnType("int");

                    b.Property<bool>("Confirmed")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Emails");
                });

            modelBuilder.Entity("restapi.Entities.Image", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BlobUri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CdnUri")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContentType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("LocationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("OriginalImageId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ReviewId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Uploaded")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("UploaderId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UploaderId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("restapi.Entities.Location", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("EditorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<Guid?>("OriginalImageId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Rating")
                        .HasColumnType("real");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("WebpImageId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.HasIndex("EditorId");

                    b.HasIndex("OriginalImageId");

                    b.HasIndex("WebpImageId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("restapi.Entities.Review", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("CreatorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("EditorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("LocationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("OriginalImageId")
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

                    b.Property<Guid?>("WebpImageId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.HasIndex("EditorId");

                    b.HasIndex("LocationId");

                    b.HasIndex("OriginalImageId");

                    b.HasIndex("WebpImageId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("restapi.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("CreatorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("EditorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.HasIndex("EditorId");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = new Guid("8d3cf447-1d52-4b94-9715-6ea654ae3164"),
                            Created = new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994),
                            Name = "Administrator"
                        },
                        new
                        {
                            Id = new Guid("ede81988-93fe-4b65-938b-0c3c5594fcef"),
                            Created = new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994),
                            Name = "Registering"
                        },
                        new
                        {
                            Id = new Guid("1048fc7f-e24a-473e-a5f6-749cc31696a0"),
                            Created = new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994),
                            Name = "User"
                        });
                });

            modelBuilder.Entity("restapi.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AccessToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AuthenticationMethod")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DOB")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("OriginalImageId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PhoneNumber")
                        .HasColumnType("int");

                    b.Property<string>("PostalArea")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PostalCode")
                        .HasColumnType("int");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Registered")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("WebpImageId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("OriginalImageId");

                    b.HasIndex("WebpImageId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("0d18b0c1-e52f-40bc-a461-7796c200ade0"),
                            AccessToken = "Admin",
                            AuthenticationMethod = "Email",
                            DOB = new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994),
                            Email = "verden.venter.app@gmail.com",
                            FirstName = "Verden",
                            LastName = "Venter",
                            Password = "$2a$11$tjCMprXXeLE7MTK3Oe7ks.42CyKMMM7spSuDCS5nkGXCFRl2q0SI6",
                            PhoneNumber = 0,
                            PostalCode = 0,
                            Registered = new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994)
                        });
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
                    b.HasOne("restapi.Entities.Category", null)
                        .WithMany()
                        .HasForeignKey("CategoriesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("restapi.Entities.Location", null)
                        .WithMany()
                        .HasForeignKey("LocationsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CategoryUser", b =>
                {
                    b.HasOne("restapi.Entities.Category", null)
                        .WithMany()
                        .HasForeignKey("FavoriteCategoriesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("restapi.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("restapi.Entities.Category", b =>
                {
                    b.HasOne("restapi.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatorId");

                    b.HasOne("restapi.Entities.User", "Editor")
                        .WithMany()
                        .HasForeignKey("EditorId");

                    b.Navigation("Creator");

                    b.Navigation("Editor");
                });

            modelBuilder.Entity("restapi.Entities.Image", b =>
                {
                    b.HasOne("restapi.Entities.User", "Uploader")
                        .WithMany()
                        .HasForeignKey("UploaderId");

                    b.Navigation("Uploader");
                });

            modelBuilder.Entity("restapi.Entities.Location", b =>
                {
                    b.HasOne("restapi.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatorId");

                    b.HasOne("restapi.Entities.User", "Editor")
                        .WithMany()
                        .HasForeignKey("EditorId");

                    b.HasOne("restapi.Entities.Image", "OriginalImage")
                        .WithMany()
                        .HasForeignKey("OriginalImageId");

                    b.HasOne("restapi.Entities.Image", "WebpImage")
                        .WithMany()
                        .HasForeignKey("WebpImageId");

                    b.Navigation("Creator");

                    b.Navigation("Editor");

                    b.Navigation("OriginalImage");

                    b.Navigation("WebpImage");
                });

            modelBuilder.Entity("restapi.Entities.Review", b =>
                {
                    b.HasOne("restapi.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatorId");

                    b.HasOne("restapi.Entities.User", "Editor")
                        .WithMany()
                        .HasForeignKey("EditorId");

                    b.HasOne("restapi.Entities.Location", "Location")
                        .WithMany("Reviews")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("restapi.Entities.Image", "OriginalImage")
                        .WithMany()
                        .HasForeignKey("OriginalImageId");

                    b.HasOne("restapi.Entities.Image", "WebpImage")
                        .WithMany()
                        .HasForeignKey("WebpImageId");

                    b.Navigation("Creator");

                    b.Navigation("Editor");

                    b.Navigation("Location");

                    b.Navigation("OriginalImage");

                    b.Navigation("WebpImage");
                });

            modelBuilder.Entity("restapi.Entities.Role", b =>
                {
                    b.HasOne("restapi.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatorId");

                    b.HasOne("restapi.Entities.User", "Editor")
                        .WithMany()
                        .HasForeignKey("EditorId");

                    b.Navigation("Creator");

                    b.Navigation("Editor");
                });

            modelBuilder.Entity("restapi.Entities.User", b =>
                {
                    b.HasOne("restapi.Entities.Image", "OriginalProfileImage")
                        .WithMany()
                        .HasForeignKey("OriginalImageId");

                    b.HasOne("restapi.Entities.Image", "WebpProfileImage")
                        .WithMany()
                        .HasForeignKey("WebpImageId");

                    b.Navigation("OriginalProfileImage");

                    b.Navigation("WebpProfileImage");
                });

            modelBuilder.Entity("RoleUser", b =>
                {
                    b.HasOne("restapi.Entities.Role", null)
                        .WithMany()
                        .HasForeignKey("RolesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("restapi.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("restapi.Entities.Location", b =>
                {
                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
