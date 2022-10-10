using SkiaSharp;

namespace restapi.Common.Providers;

public class ImageProvider : IImageProvider
{
  public const string ImageContentType = "image/webp";
  public const int CompressedImageQuality = 50;

  public async Task<SKData> ConvertImageToWebp(IFormFile file)
  {
    var memoryStream = new MemoryStream();
    await file.CopyToAsync(memoryStream);
    var uploadData = SKData.CreateCopy(memoryStream.GetBuffer());
    return SKImage.FromEncodedData(uploadData).Encode(SKEncodedImageFormat.Webp, CompressedImageQuality);
  }
}