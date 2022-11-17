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
                    { new Guid("5e73d79e-c804-4877-a9aa-c428443bc35d"), new DateTime(2022, 11, 16, 14, 8, 29, 345, DateTimeKind.Unspecified).AddTicks(6997), null, null, "Registering", null },
                    { new Guid("c147310b-2550-40d0-a00c-1db9fc0ea246"), new DateTime(2022, 11, 16, 14, 8, 29, 345, DateTimeKind.Unspecified).AddTicks(6997), null, null, "Administrator", null },
                    { new Guid("e2f25b57-0a38-4ab4-bf7a-136303bfa34a"), new DateTime(2022, 11, 16, 14, 8, 29, 345, DateTimeKind.Unspecified).AddTicks(6997), null, null, "User", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessToken", "Address", "AuthenticationMethod", "DOB", "Email", "FirstName", "LastName", "OriginalImageId", "Password", "PhoneNumber", "PostalArea", "PostalCode", "RefreshToken", "Registered", "Updated", "WebpImageId" },
                values: new object[,]
                {
                    { new Guid("4fe87d69-4d72-4f09-a2e5-77093a79d034"), null, null, "Email", new DateTime(2022, 11, 16, 14, 8, 29, 345, DateTimeKind.Unspecified).AddTicks(6997), "jdoe@email.com", "John", "Doe", null, "$2a$11$B8/ifZhsmK.R4S.wvQz3kuYbuQlOb61S/tEX.kfrjQH7jmDjn8rdO", 0, null, 0, null, new DateTime(2022, 11, 16, 14, 8, 29, 345, DateTimeKind.Unspecified).AddTicks(6997), null, null },
                    { new Guid("92253a51-8b2e-4286-82f9-56ac69eee68b"), "Admin", null, "Email", new DateTime(2022, 11, 16, 14, 8, 29, 345, DateTimeKind.Unspecified).AddTicks(6997), "verden.venter.app@gmail.com", "Verden", "Venter", null, "$2a$11$3WB7MZKZrUJhAhqukVQzD.KTCQHXOXN4nA3qsQSgpWUMEUvShRNW2", 0, null, 0, null, new DateTime(2022, 11, 16, 14, 8, 29, 345, DateTimeKind.Unspecified).AddTicks(6997), null, null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("5e73d79e-c804-4877-a9aa-c428443bc35d"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("c147310b-2550-40d0-a00c-1db9fc0ea246"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("e2f25b57-0a38-4ab4-bf7a-136303bfa34a"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4fe87d69-4d72-4f09-a2e5-77093a79d034"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("92253a51-8b2e-4286-82f9-56ac69eee68b"));
        }
    }
}
