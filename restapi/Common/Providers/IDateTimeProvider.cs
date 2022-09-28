namespace restapi.Common.Providers;

public interface IDateTimeProvider
{
  DateTime UtcNow { get; }
  DateTime CEST { get; }
}