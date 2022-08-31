using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class PropertyCategoryRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PropertyId",
                table: "Categories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_PropertyId",
                table: "Categories",
                column: "PropertyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Properties_PropertyId",
                table: "Categories",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Properties_PropertyId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_PropertyId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "PropertyId",
                table: "Categories");
        }
    }
}
