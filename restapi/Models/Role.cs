using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace restapi.Models;

public class Role
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = "User";
  public DateTime Created { get; set; }
  public DateTime? Updated { get; set; }
  public User? Creator { get; set; }
  public User? Editor { get; set; }

  [JsonIgnore]
  public List<User> Users { get; set; } = new List<User>();
}