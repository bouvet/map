namespace restapi.Common.Services;

public interface IDateTimeProvider
{
  DateTime UtcNow { get; }
  DateTime CEST { get; }
}