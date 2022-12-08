using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Migrations
{
    public partial class Session : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LocationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sessions_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Sessions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_LocationId",
                table: "Sessions",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_UserId",
                table: "Sessions",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sessions");

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
    }
}
