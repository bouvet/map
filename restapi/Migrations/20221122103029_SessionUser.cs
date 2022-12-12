using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class SessionUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("08c4f86b-9d46-48b4-a13d-d5d7cecfad46"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("0dfd15f3-aa61-4043-95ba-5c4b85594b5f"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("cab509dd-cb58-4182-bf93-74778a39f736"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("71ca60e9-f8b3-445a-b5d7-9c32a5736734"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("ec5a7901-0c07-460c-99b8-8f977eaa00f4"));

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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { new Guid("08c4f86b-9d46-48b4-a13d-d5d7cecfad46"), new DateTime(2022, 11, 21, 14, 50, 31, 423, DateTimeKind.Unspecified).AddTicks(6240), null, null, "Administrator", null },
                    { new Guid("0dfd15f3-aa61-4043-95ba-5c4b85594b5f"), new DateTime(2022, 11, 21, 14, 50, 31, 423, DateTimeKind.Unspecified).AddTicks(6240), null, null, "User", null },
                    { new Guid("cab509dd-cb58-4182-bf93-74778a39f736"), new DateTime(2022, 11, 21, 14, 50, 31, 423, DateTimeKind.Unspecified).AddTicks(6240), null, null, "Registering", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessToken", "Address", "AuthenticationMethod", "DOB", "Email", "FirstName", "LastName", "OriginalImageId", "Password", "PhoneNumber", "PostalArea", "PostalCode", "RefreshToken", "Registered", "Updated", "WebpImageId" },
                values: new object[,]
                {
                    { new Guid("71ca60e9-f8b3-445a-b5d7-9c32a5736734"), null, null, "Email", new DateTime(2022, 11, 21, 14, 50, 31, 423, DateTimeKind.Unspecified).AddTicks(6240), "jdoe@email.com", "John", "Doe", null, "$2a$11$rr33B4SK2sxGrlZDwMUI.eVpcRgBV76TkzO4mMgOYi7C8IwOaZCmK", 0, null, 0, null, new DateTime(2022, 11, 21, 14, 50, 31, 423, DateTimeKind.Unspecified).AddTicks(6240), null, null },
                    { new Guid("ec5a7901-0c07-460c-99b8-8f977eaa00f4"), "Admin", null, "Email", new DateTime(2022, 11, 21, 14, 50, 31, 423, DateTimeKind.Unspecified).AddTicks(6240), "verden.venter.app@gmail.com", "Verden", "Venter", null, "$2a$11$qobIJihGT/d5XHHqAl.r0.RRBMr8gb624F0xd/pxxn4Lsgt3YyY9C", 0, null, 0, null, new DateTime(2022, 11, 21, 14, 50, 31, 423, DateTimeKind.Unspecified).AddTicks(6240), null, null }
                });
        }
    }
}
