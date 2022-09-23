using SkiaSharp;

namespace restapi.Common.Services.Providers;

public class ImageProvider : IImageProvider
{
  public const string ImageContentType = "image/webp";
  public const int CompressedImageQuality = 50;

  public async Task<SKData> ConvertImageToWebp(IFormFile uploadFile)
  {
    var streamFromUpload = new MemoryStream();
    await uploadFile.CopyToAsync(streamFromUpload);
    var uploadData = SKData.CreateCopy(streamFromUpload.GetBuffer());
    return SKImage.FromEncodedData(uploadData).Encode(SKEncodedImageFormat.Webp, CompressedImageQuality);
  }
}