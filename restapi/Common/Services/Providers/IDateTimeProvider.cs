namespace restapi.Common.Services.Providers;

public interface IDateTimeProvider
{
  DateTime UtcNow { get; }
  DateTime CEST { get; }
}