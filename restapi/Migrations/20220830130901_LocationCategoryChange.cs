using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class LocationCategoryChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryLocation");

            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "Categories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_LocationId",
                table: "Categories",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Locations_LocationId",
                table: "Categories",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Locations_LocationId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_LocationId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "Categories");

            migrationBuilder.CreateTable(
                name: "CategoryLocation",
                columns: table => new
                {
                    CategoriesId = table.Column<int>(type: "int", nullable: false),
                    LocationsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryLocation", x => new { x.CategoriesId, x.LocationsId });
                    table.ForeignKey(
                        name: "FK_CategoryLocation_Categories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryLocation_Locations_LocationsId",
                        column: x => x.LocationsId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryLocation_LocationsId",
                table: "CategoryLocation",
                column: "LocationsId");
        }
    }
}
