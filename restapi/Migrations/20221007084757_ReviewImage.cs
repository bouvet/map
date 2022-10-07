using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class ReviewImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Images_ImageId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                table: "Reviews",
                newName: "WebpImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_ImageId",
                table: "Reviews",
                newName: "IX_Reviews_WebpImageId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Images",
                newName: "OriginalFileName");

            migrationBuilder.AddColumn<Guid>(
                name: "OriginalImageId",
                table: "Reviews",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LocationId",
                table: "Images",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OriginalImageId",
                table: "Images",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ReviewId",
                table: "Images",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_OriginalImageId",
                table: "Reviews",
                column: "OriginalImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Images_OriginalImageId",
                table: "Reviews",
                column: "OriginalImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Images_WebpImageId",
                table: "Reviews",
                column: "WebpImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Images_OriginalImageId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Images_WebpImageId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_OriginalImageId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "OriginalImageId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "OriginalImageId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ReviewId",
                table: "Images");

            migrationBuilder.RenameColumn(
                name: "WebpImageId",
                table: "Reviews",
                newName: "ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_WebpImageId",
                table: "Reviews",
                newName: "IX_Reviews_ImageId");

            migrationBuilder.RenameColumn(
                name: "OriginalFileName",
                table: "Images",
                newName: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Images_ImageId",
                table: "Reviews",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }
    }
}
