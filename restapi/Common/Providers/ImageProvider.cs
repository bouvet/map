using SkiaSharp;

namespace restapi.Common.Providers;

public class ImageProvider : IImageProvider
{
  public const string ImageContentType = "image/webp";
  public const int CompressedImageQuality = 50;

  public async Task<SKData> ConvertImageToWebp(IFormFile file)
  {
    var streamFromUpload = new MemoryStream();
    await file.CopyToAsync(streamFromUpload);
    var uploadData = SKData.CreateCopy(streamFromUpload.GetBuffer());
    return SKImage.FromEncodedData(uploadData).Encode(SKEncodedImageFormat.Webp, CompressedImageQuality);
  }
}