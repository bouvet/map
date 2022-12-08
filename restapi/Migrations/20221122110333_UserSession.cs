using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class UserSession : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("a3c76229-3f5a-4446-99fd-45dd4b4e044a"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("e26f9e1a-8fa0-42d6-ba72-8198726c6a19"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("ee9c2c7a-4186-421f-a207-c236ed05ec6f"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b786d8a2-5d6f-4a17-913d-34cf8b4ab3b2"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("dd7f213a-6c96-40c4-a53e-0b33700120fa"));

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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { new Guid("a3c76229-3f5a-4446-99fd-45dd4b4e044a"), new DateTime(2022, 11, 22, 11, 30, 28, 557, DateTimeKind.Unspecified).AddTicks(3970), null, null, "Administrator", null },
                    { new Guid("e26f9e1a-8fa0-42d6-ba72-8198726c6a19"), new DateTime(2022, 11, 22, 11, 30, 28, 557, DateTimeKind.Unspecified).AddTicks(3970), null, null, "User", null },
                    { new Guid("ee9c2c7a-4186-421f-a207-c236ed05ec6f"), new DateTime(2022, 11, 22, 11, 30, 28, 557, DateTimeKind.Unspecified).AddTicks(3970), null, null, "Registering", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessToken", "Address", "AuthenticationMethod", "DOB", "Email", "FirstName", "LastName", "OriginalImageId", "Password", "PhoneNumber", "PostalArea", "PostalCode", "RefreshToken", "Registered", "Updated", "WebpImageId" },
                values: new object[,]
                {
                    { new Guid("b786d8a2-5d6f-4a17-913d-34cf8b4ab3b2"), null, null, "Email", new DateTime(2022, 11, 22, 11, 30, 28, 557, DateTimeKind.Unspecified).AddTicks(3970), "jdoe@email.com", "John", "Doe", null, "$2a$11$GK6CKhTTLGrh91eD1SnqMuZ2qw./.ycaCZscvzwYKcS4C7PVwCDyu", 0, null, 0, null, new DateTime(2022, 11, 22, 11, 30, 28, 557, DateTimeKind.Unspecified).AddTicks(3970), null, null },
                    { new Guid("dd7f213a-6c96-40c4-a53e-0b33700120fa"), "Admin", null, "Email", new DateTime(2022, 11, 22, 11, 30, 28, 557, DateTimeKind.Unspecified).AddTicks(3970), "verden.venter.app@gmail.com", "Verden", "Venter", null, "$2a$11$Fs8R5wCsQhLrotFNwujF1ukdzYkHzz9FWzlufKogpXG.BRXvtgePO", 0, null, 0, null, new DateTime(2022, 11, 22, 11, 30, 28, 557, DateTimeKind.Unspecified).AddTicks(3970), null, null }
                });
        }
    }
}
