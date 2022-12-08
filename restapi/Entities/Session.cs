namespace restapi.Entities;
public class Session 
{
    public Guid Id { get; set; }
    public Location Location { get; set; } = null!;
    public DateTime Registered { get; set; }
    public User User { get; set; } = null!;

}