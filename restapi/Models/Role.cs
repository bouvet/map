using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace restapi.Models;

public class Role
{
  [Key]
  public Guid Id { get; set; }
  public string Name { get; set; } = "User";
  [JsonIgnore]
  public List<User> Users { get; set; } = new List<User>();
}