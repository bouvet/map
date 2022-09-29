using ErrorOr;
using SkiaSharp;

namespace restapi.Common.Providers;

public interface IImageProvider
{
  Task<SKData> ConvertImageToWebp(IFormFile uploadFile);
}