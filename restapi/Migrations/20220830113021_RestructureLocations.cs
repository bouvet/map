using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class RestructureLocations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Properties_PropertyId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Properties_PropertyId",
                table: "Locations");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropIndex(
                name: "IX_Locations_PropertyId",
                table: "Locations");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Locations",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "PropertyId",
                table: "Locations",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "PropertyId",
                table: "Categories",
                newName: "LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_PropertyId",
                table: "Categories",
                newName: "IX_Categories_LocationId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Locations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Img",
                table: "Locations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Locations",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Locations",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

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

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Img",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Locations");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Locations",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Locations",
                newName: "PropertyId");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "Categories",
                newName: "PropertyId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_LocationId",
                table: "Categories",
                newName: "IX_Categories_PropertyId");

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Img = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Locations_PropertyId",
                table: "Locations",
                column: "PropertyId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Properties_PropertyId",
                table: "Categories",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Properties_PropertyId",
                table: "Locations",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
