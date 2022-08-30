namespace restapi.Models
{
  public class Property
  {
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public int Rating { get; set; }
    // public List<Category> Categories { get; set; }
  }
}

/*
    properties: {
        title: "",
        description: "",
        category: [], ===> List of Categories
        img: "",
        rating: int
    }
*/