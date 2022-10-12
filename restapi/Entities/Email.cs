using System.ComponentModel.DataAnnotations;

namespace restapi.Entities;

public class Email
{
  [Key]
  public Guid Id { get; set; }
  public string Address { get; set; } = null!;
  public int ConfirmationCode { get; set; }
  public bool Confirmed { get; set; }
  public DateTime CodeValidTo { get; set; }
  public DateTime Created { get; set; }
  public DateTime? Updated { get; set; }
}