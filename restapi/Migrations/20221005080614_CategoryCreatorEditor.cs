using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class CategoryCreatorEditor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatorId",
                table: "Categories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "EditorId",
                table: "Categories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_CreatorId",
                table: "Categories",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_EditorId",
                table: "Categories",
                column: "EditorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Users_CreatorId",
                table: "Categories",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Users_EditorId",
                table: "Categories",
                column: "EditorId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Users_CreatorId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Users_EditorId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_CreatorId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_EditorId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "EditorId",
                table: "Categories");
        }
    }
}
