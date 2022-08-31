using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class LocationPropertyRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Properties_PropertiesId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_PropertiesId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "PropertiesId",
                table: "Locations");

            migrationBuilder.AddColumn<int>(
                name: "PropertyId",
                table: "Locations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Locations_PropertyId",
                table: "Locations",
                column: "PropertyId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Properties_PropertyId",
                table: "Locations",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Properties_PropertyId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Locations_PropertyId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "PropertyId",
                table: "Locations");

            migrationBuilder.AddColumn<int>(
                name: "PropertiesId",
                table: "Locations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Locations_PropertiesId",
                table: "Locations",
                column: "PropertiesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Properties_PropertiesId",
                table: "Locations",
                column: "PropertiesId",
                principalTable: "Properties",
                principalColumn: "Id");
        }
    }
}
