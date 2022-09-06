namespace restapi
{
  public class Category
  {
    public int? Id { get; set; }

    public string Name { get; set; } = "new category";

    public string Emoji { get; set; } = "😀";

    [JsonIgnore]
    public List<Location> Locations { get; set; } = new List<Location>();

  }
}