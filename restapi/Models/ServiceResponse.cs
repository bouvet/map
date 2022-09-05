
namespace restapi.Models
{
  public class ServiceResponse<T>
  {
    public T? Data { get; set; } = default(T);
    public bool Success { get; set; } = false;
    public int StatusCode { get; set; } = StatusCodes.Status500InternalServerError;
    public string Message { get; set; } = "Something went wrong, please try again";
  }
}