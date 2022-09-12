
namespace restapi.Models
{
  public class ServiceResponse<T>
  {
    public T? Data { get; set; } = default(T);
    public bool Success { get; set; } = false;
    public int StatusCode { get; set; } = StatusCodes.Status500InternalServerError;
    public string Message { get; set; } = "Something went wrong, please try again";

    public ServiceResponse() { }
    public ServiceResponse(int StatusCode, String Message = "", T? data = default(T))
    {
      this.StatusCode = StatusCode;
      this.Data = data;
      this.Message = Message;

      // code 200-299
      if (this.StatusCode >= 200 && this.StatusCode < 300)
      {
        this.Data = data;
        this.Success = true;
      }
      if (StatusCode >= 300)
      {
        this.Success = false;
      }

      if (StatusCode == StatusCodes.Status500InternalServerError && string.IsNullOrEmpty(Message))
      {
        this.Message = "Ops! something went wrong!";
      }
    }
  }
}