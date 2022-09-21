namespace restapi.Models;

public class Category
{
  public const int MinNameLength = 2;
  public const int MaxNameLength = 15;

  [Key]
  public Guid Id { get; set; } = new Guid();

  public string Name { get; set; } = "new category";

  public string Emoji { get; set; } = "😀";

  [JsonIgnore]
  public List<Location> Locations { get; set; } = new List<Location>();

}