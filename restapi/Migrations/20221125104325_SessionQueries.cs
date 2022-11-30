using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class SessionQueries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("05d6e54e-f862-4f6a-a062-9adcf5a7ac35"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("5efe7e1e-c173-47d6-b202-263c7df35385"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("d02a4fc6-118a-497e-aa02-ca173514757f"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("04c5a3bc-7a8c-4fd7-b57d-ac83c9b5c8c5"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("7cf5bb84-76b8-4b3c-980a-be4c95e2ff44"));

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Created", "CreatorId", "EditorId", "Name", "Updated" },
                values: new object[,]
                {
                    { new Guid("1dd08cac-a07c-47a0-a7f0-195bb29f8902"), new DateTime(2022, 11, 25, 11, 43, 24, 622, DateTimeKind.Unspecified).AddTicks(9280), null, null, "Administrator", null },
                    { new Guid("88878e30-c37d-4f3f-91fd-eb379c683031"), new DateTime(2022, 11, 25, 11, 43, 24, 622, DateTimeKind.Unspecified).AddTicks(9280), null, null, "User", null },
                    { new Guid("c7409c44-172c-4714-ae6a-09687d0b9ea8"), new DateTime(2022, 11, 25, 11, 43, 24, 622, DateTimeKind.Unspecified).AddTicks(9280), null, null, "Registering", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessToken", "Address", "AuthenticationMethod", "DOB", "Email", "FirstName", "LastName", "OriginalImageId", "Password", "PhoneNumber", "PostalArea", "PostalCode", "RefreshToken", "Registered", "Updated", "WebpImageId" },
                values: new object[,]
                {
                    { new Guid("9fe0bc64-57cc-4edb-a7c9-acf48a220ed7"), null, null, "Email", new DateTime(2022, 11, 25, 11, 43, 24, 622, DateTimeKind.Unspecified).AddTicks(9280), "jdoe@email.com", "John", "Doe", null, "$2a$11$3ki5/AFDevoxydvuXNE6jus8cdX5EYJlSbh9vwFrf.cjXxL09G5Fa", 0, null, 0, null, new DateTime(2022, 11, 25, 11, 43, 24, 622, DateTimeKind.Unspecified).AddTicks(9280), null, null },
                    { new Guid("f44695f3-5672-49c8-820a-ee995e2ae874"), "Admin", null, "Email", new DateTime(2022, 11, 25, 11, 43, 24, 622, DateTimeKind.Unspecified).AddTicks(9280), "verden.venter.app@gmail.com", "Verden", "Venter", null, "$2a$11$zyHuqn77lZ2GNrJ6.5vkLum65kFirM8P5MG4fY0G.PRKx5zMeZu9.", 0, null, 0, null, new DateTime(2022, 11, 25, 11, 43, 24, 622, DateTimeKind.Unspecified).AddTicks(9280), null, null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("1dd08cac-a07c-47a0-a7f0-195bb29f8902"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("88878e30-c37d-4f3f-91fd-eb379c683031"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("c7409c44-172c-4714-ae6a-09687d0b9ea8"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("9fe0bc64-57cc-4edb-a7c9-acf48a220ed7"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("f44695f3-5672-49c8-820a-ee995e2ae874"));

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Created", "CreatorId", "EditorId", "Name", "Updated" },
                values: new object[,]
                {
                    { new Guid("05d6e54e-f862-4f6a-a062-9adcf5a7ac35"), new DateTime(2022, 11, 22, 12, 3, 32, 576, DateTimeKind.Unspecified).AddTicks(1440), null, null, "User", null },
                    { new Guid("5efe7e1e-c173-47d6-b202-263c7df35385"), new DateTime(2022, 11, 22, 12, 3, 32, 576, DateTimeKind.Unspecified).AddTicks(1440), null, null, "Registering", null },
                    { new Guid("d02a4fc6-118a-497e-aa02-ca173514757f"), new DateTime(2022, 11, 22, 12, 3, 32, 576, DateTimeKind.Unspecified).AddTicks(1440), null, null, "Administrator", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessToken", "Address", "AuthenticationMethod", "DOB", "Email", "FirstName", "LastName", "OriginalImageId", "Password", "PhoneNumber", "PostalArea", "PostalCode", "RefreshToken", "Registered", "Updated", "WebpImageId" },
                values: new object[,]
                {
                    { new Guid("04c5a3bc-7a8c-4fd7-b57d-ac83c9b5c8c5"), "Admin", null, "Email", new DateTime(2022, 11, 22, 12, 3, 32, 576, DateTimeKind.Unspecified).AddTicks(1440), "verden.venter.app@gmail.com", "Verden", "Venter", null, "$2a$11$WwtmuADzusgq/DiIggwzSee2N9JJP4nRzxNf6UYKS1tSWwwt1r0Nq", 0, null, 0, null, new DateTime(2022, 11, 22, 12, 3, 32, 576, DateTimeKind.Unspecified).AddTicks(1440), null, null },
                    { new Guid("7cf5bb84-76b8-4b3c-980a-be4c95e2ff44"), null, null, "Email", new DateTime(2022, 11, 22, 12, 3, 32, 576, DateTimeKind.Unspecified).AddTicks(1440), "jdoe@email.com", "John", "Doe", null, "$2a$11$Efj5mMpd5250CcbLSg4wR.kJC7SL11JwOclA7Swzg.CfpESKDSDNa", 0, null, 0, null, new DateTime(2022, 11, 22, 12, 3, 32, 576, DateTimeKind.Unspecified).AddTicks(1440), null, null }
                });
        }
    }
}
