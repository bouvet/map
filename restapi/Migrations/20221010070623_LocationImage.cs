using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class LocationImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OriginalImageId",
                table: "Locations",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WebpImageId",
                table: "Locations",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Locations_OriginalImageId",
                table: "Locations",
                column: "OriginalImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_WebpImageId",
                table: "Locations",
                column: "WebpImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Images_OriginalImageId",
                table: "Locations",
                column: "OriginalImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Images_WebpImageId",
                table: "Locations",
                column: "WebpImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Images_OriginalImageId",
                table: "Locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Images_WebpImageId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_OriginalImageId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_WebpImageId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "OriginalImageId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "WebpImageId",
                table: "Locations");
        }
    }
}
