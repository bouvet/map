using SkiaSharp;

namespace restapi.Common.Services.Providers;

public interface IImageProvider
{
  Task<SKData> ConvertImageToWebp(IFormFile uploadFile);
}