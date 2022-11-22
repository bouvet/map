using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace restapi.Entities;

public class User
{
    public const int MinPasswordLength = 8;

    [Key]
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string? Password { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Address { get; set; }
    public string? PostalArea { get; set; }
    public int PostalCode { get; set; }
    public int PhoneNumber { get; set; }
    public DateTime DOB { get; set; }
    public DateTime Registered { get; set; }
    public DateTime? Updated { get; set; }
    public string AuthenticationMethod { get; set; } = "Email";
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
    public List<Session>? Sessions { get; set; }

    [JsonIgnore]
    public List<Role> Roles { get; set; } = new List<Role>();
    public List<Category> FavoriteCategories { get; set; } = new List<Category>();

    [ForeignKey("OriginalImageId")]
    public Image? OriginalProfileImage { get; set; }

    [ForeignKey("WebpImageId")]
    public Image? WebpProfileImage { get; set; }
}