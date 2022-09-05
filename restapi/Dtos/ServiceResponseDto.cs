namespace restapi.Dtos
{
  public class ServiceResponseDto
  {
    public object? Data { get; set; } = null;
    public bool Success { get; set; } = true;
    public int StatusCode { get; set; }
    public string Message { get; set; } = string.Empty;
  }
}