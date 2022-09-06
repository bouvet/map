namespace restapi
{
  public class Category
  {
    [Key]
    public Guid Id { get; set; } = new Guid();

    public string Name { get; set; } = "new category";

    public string Emoji { get; set; } = "😀";

    [JsonIgnore]
    public List<Location> Locations { get; set; } = new List<Location>();

  }
}