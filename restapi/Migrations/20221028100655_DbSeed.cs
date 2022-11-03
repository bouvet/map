using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class DbSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Created", "CreatorId", "EditorId", "Name", "Updated" },
                values: new object[,]
                {
                    { new Guid("1048fc7f-e24a-473e-a5f6-749cc31696a0"), new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994), null, null, "User", null },
                    { new Guid("8d3cf447-1d52-4b94-9715-6ea654ae3164"), new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994), null, null, "Administrator", null },
                    { new Guid("ede81988-93fe-4b65-938b-0c3c5594fcef"), new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994), null, null, "Registering", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessToken", "Address", "AuthenticationMethod", "DOB", "Email", "FirstName", "LastName", "OriginalImageId", "Password", "PhoneNumber", "PostalArea", "PostalCode", "RefreshToken", "Registered", "Updated", "WebpImageId" },
                values: new object[] { new Guid("0d18b0c1-e52f-40bc-a461-7796c200ade0"), "Admin", null, "Email", new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994), "verden.venter.app@gmail.com", "Verden", "Venter", null, "$2a$11$tjCMprXXeLE7MTK3Oe7ks.42CyKMMM7spSuDCS5nkGXCFRl2q0SI6", 0, null, 0, null, new DateTime(2022, 10, 28, 12, 6, 54, 775, DateTimeKind.Unspecified).AddTicks(6994), null, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("1048fc7f-e24a-473e-a5f6-749cc31696a0"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("8d3cf447-1d52-4b94-9715-6ea654ae3164"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("ede81988-93fe-4b65-938b-0c3c5594fcef"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("0d18b0c1-e52f-40bc-a461-7796c200ade0"));
        }
    }
}
