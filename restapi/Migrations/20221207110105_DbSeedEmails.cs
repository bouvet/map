using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class DbSeedEmails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("405d7c65-b876-4479-b5d5-4d24c242fa91"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("5a827c84-f3fe-4344-baf6-27ed14c233c9"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("63daf05f-ed32-4b44-9ca3-1f795d1a2571"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b07bfe24-0052-4c7c-bb3b-ed84081e0ce7"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("f76ed3dd-da08-429d-afa6-3ac672c426d1"));

            migrationBuilder.InsertData(
                table: "Emails",
                columns: new[] { "Id", "Address", "CodeValidTo", "ConfirmationCode", "Confirmed", "Created", "Updated" },
                values: new object[,]
                {
                    { new Guid("3861ede9-9485-42d1-99c1-b46305ce85b6"), "jdoe@email.com", new DateTime(2022, 12, 9, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), 123123, true, new DateTime(2022, 12, 7, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), null },
                    { new Guid("7fceed7f-9194-474b-9436-11821d0ad314"), "verden.venter.app@gmail.com", new DateTime(2022, 12, 9, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), 123123, true, new DateTime(2022, 12, 7, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), null }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Created", "CreatorId", "EditorId", "Name", "Updated" },
                values: new object[,]
                {
                    { new Guid("31a73805-9a93-42b0-a121-a3a586e0a59e"), new DateTime(2022, 12, 7, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), null, null, "Registering", null },
                    { new Guid("6e6f074e-a5dd-4acc-9fe0-05377213c695"), new DateTime(2022, 12, 7, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), null, null, "User", null },
                    { new Guid("8dd0e6bd-f325-4b86-aaeb-475f6192b2e5"), new DateTime(2022, 12, 7, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), null, null, "Administrator", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessToken", "Address", "AuthenticationMethod", "DOB", "Email", "FirstName", "LastName", "OriginalImageId", "Password", "PhoneNumber", "PostalArea", "PostalCode", "RefreshToken", "Registered", "Updated", "WebpImageId" },
                values: new object[,]
                {
                    { new Guid("b4184751-4af1-4c07-b884-7ff051322815"), "Admin", null, "Email", new DateTime(2022, 12, 7, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), "verden.venter.app@gmail.com", "Verden", "Venter", null, "$2a$11$W5HLcHD6aDghAN0BWoHMgOYCZfJQ0kEYGDnRAChC772Fowbw44Mky", 0, null, 0, null, new DateTime(2022, 12, 7, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), null, null },
                    { new Guid("bcf79c4a-9718-4861-99b2-6b5afff918c0"), null, null, "Email", new DateTime(2022, 12, 7, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), "jdoe@email.com", "John", "Doe", null, "$2a$11$MNlf9QITV018CeBSk43zB.M3poZFK.p6uTg.ILFatoBIxS632uiVS", 0, null, 0, null, new DateTime(2022, 12, 7, 12, 1, 4, 773, DateTimeKind.Unspecified).AddTicks(4224), null, null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Emails",
                keyColumn: "Id",
                keyValue: new Guid("3861ede9-9485-42d1-99c1-b46305ce85b6"));

            migrationBuilder.DeleteData(
                table: "Emails",
                keyColumn: "Id",
                keyValue: new Guid("7fceed7f-9194-474b-9436-11821d0ad314"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("31a73805-9a93-42b0-a121-a3a586e0a59e"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6e6f074e-a5dd-4acc-9fe0-05377213c695"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("8dd0e6bd-f325-4b86-aaeb-475f6192b2e5"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b4184751-4af1-4c07-b884-7ff051322815"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("bcf79c4a-9718-4861-99b2-6b5afff918c0"));

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Created", "CreatorId", "EditorId", "Name", "Updated" },
                values: new object[,]
                {
                    { new Guid("405d7c65-b876-4479-b5d5-4d24c242fa91"), new DateTime(2022, 12, 2, 15, 50, 51, 967, DateTimeKind.Unspecified).AddTicks(1737), null, null, "Registering", null },
                    { new Guid("5a827c84-f3fe-4344-baf6-27ed14c233c9"), new DateTime(2022, 12, 2, 15, 50, 51, 967, DateTimeKind.Unspecified).AddTicks(1737), null, null, "User", null },
                    { new Guid("63daf05f-ed32-4b44-9ca3-1f795d1a2571"), new DateTime(2022, 12, 2, 15, 50, 51, 967, DateTimeKind.Unspecified).AddTicks(1737), null, null, "Administrator", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessToken", "Address", "AuthenticationMethod", "DOB", "Email", "FirstName", "LastName", "OriginalImageId", "Password", "PhoneNumber", "PostalArea", "PostalCode", "RefreshToken", "Registered", "Updated", "WebpImageId" },
                values: new object[,]
                {
                    { new Guid("b07bfe24-0052-4c7c-bb3b-ed84081e0ce7"), null, null, "Email", new DateTime(2022, 12, 2, 15, 50, 51, 967, DateTimeKind.Unspecified).AddTicks(1737), "jdoe@email.com", "John", "Doe", null, "$2a$11$jCTr1bMTch8nXTvBredBzu04BvQSSXLdOPFNCQ6c77swDEWfqzHt.", 0, null, 0, null, new DateTime(2022, 12, 2, 15, 50, 51, 967, DateTimeKind.Unspecified).AddTicks(1737), null, null },
                    { new Guid("f76ed3dd-da08-429d-afa6-3ac672c426d1"), "Admin", null, "Email", new DateTime(2022, 12, 2, 15, 50, 51, 967, DateTimeKind.Unspecified).AddTicks(1737), "verden.venter.app@gmail.com", "Verden", "Venter", null, "$2a$11$If1hyeBvrGafGNef22JxP.UrD9lS46JxGiSsvxak1MKUZtgvZvdhm", 0, null, 0, null, new DateTime(2022, 12, 2, 15, 50, 51, 967, DateTimeKind.Unspecified).AddTicks(1737), null, null }
                });
        }
    }
}
