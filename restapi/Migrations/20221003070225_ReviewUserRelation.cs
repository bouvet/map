using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class ReviewUserRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatorId",
                table: "Reviews",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "EditorId",
                table: "Reviews",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_CreatorId",
                table: "Reviews",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_EditorId",
                table: "Reviews",
                column: "EditorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_CreatorId",
                table: "Reviews",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_EditorId",
                table: "Reviews",
                column: "EditorId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_CreatorId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_EditorId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_CreatorId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_EditorId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "EditorId",
                table: "Reviews");
        }
    }
}
