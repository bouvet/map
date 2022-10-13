using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class UserProfileImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OriginalImageId",
                table: "Users",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WebpImageId",
                table: "Users",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_OriginalImageId",
                table: "Users",
                column: "OriginalImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_WebpImageId",
                table: "Users",
                column: "WebpImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Images_OriginalImageId",
                table: "Users",
                column: "OriginalImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Images_WebpImageId",
                table: "Users",
                column: "WebpImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Images_OriginalImageId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Images_WebpImageId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_OriginalImageId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_WebpImageId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OriginalImageId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "WebpImageId",
                table: "Users");
        }
    }
}
