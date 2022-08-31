namespace restapi
{
  public class Category
  {
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Emoji { get; set; } = string.Empty;

    [JsonIgnore]
    public List<Location> Locations { get; set; } = new List<Location>();

  }
}