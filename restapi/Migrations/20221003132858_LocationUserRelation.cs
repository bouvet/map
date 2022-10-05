using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class LocationUserRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatorId",
                table: "Roles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "EditorId",
                table: "Roles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreatorId",
                table: "Locations",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "EditorId",
                table: "Locations",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Roles_CreatorId",
                table: "Roles",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_EditorId",
                table: "Roles",
                column: "EditorId");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_CreatorId",
                table: "Locations",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_EditorId",
                table: "Locations",
                column: "EditorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Users_CreatorId",
                table: "Locations",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Users_EditorId",
                table: "Locations",
                column: "EditorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Users_CreatorId",
                table: "Roles",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Users_EditorId",
                table: "Roles",
                column: "EditorId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Users_CreatorId",
                table: "Locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Users_EditorId",
                table: "Locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Users_CreatorId",
                table: "Roles");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Users_EditorId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_CreatorId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_EditorId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Locations_CreatorId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_EditorId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "EditorId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "EditorId",
                table: "Locations");
        }
    }
}
