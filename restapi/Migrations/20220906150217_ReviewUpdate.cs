using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
  public partial class ReviewUpdate : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.AddColumn<string>(
          name: "Image",
          table: "Reviews",
          type: "nvarchar(max)",
          nullable: false,
          defaultValue: "");

      migrationBuilder.AddColumn<DateTime>(
          name: "Updated",
          table: "Reviews",
          type: "datetime2",
          nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropColumn(
          name: "Image",
          table: "Reviews");

      migrationBuilder.DropColumn(
          name: "Updated",
          table: "Reviews");
    }
  }
}
