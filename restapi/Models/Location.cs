﻿namespace restapi.Models
{
  public class Location
  {
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty;
    public string Img { get; set; } = string.Empty;
    public int Rating { get; set; }
    [Required]
    public double Latitude { get; set; }
    [Required]
    public double Longitude { get; set; }
    public List<Category> Categories { get; set; } = new List<Category>();
  }
}