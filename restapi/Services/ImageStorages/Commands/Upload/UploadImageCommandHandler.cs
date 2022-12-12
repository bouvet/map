using ErrorOr;
using MediatR;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.Blob;
using restapi.Common.Providers;
using restapi.Data;
using restapi.Entities;
using restapi.Services.ImageStorages.Common;
using SkiaSharp;

namespace restapi.Services.ImageStorages.Commands.Upload;

public class UploadImageCommandHandler : IRequestHandler<UploadImageCommand, ErrorOr<ImageStorageResult>>
{
  private readonly DataContext dataContext;
  private readonly AzureProvider azureProvider;
  private readonly IDateTimeProvider dateTimeProvider;
  public UploadImageCommandHandler(DataContext dataContext, IOptions<AzureProvider> azureOptions, IDateTimeProvider dateTimeProvider)
  {
    this.dataContext = dataContext;
    azureProvider = azureOptions.Value;
    this.dateTimeProvider = dateTimeProvider;
  }

  public async Task<ErrorOr<ImageStorageResult>> Handle(UploadImageCommand request, CancellationToken cancellationToken)
  {
    CloudBlobContainer blobContainer = await azureProvider.GetImageBlobContainer(cancellationToken);

    Guid originalImageId = Guid.NewGuid();
    Guid webpImageId = Guid.NewGuid();

    var originalImageStream = new MemoryStream();
    var webpImageStream = new MemoryStream();

    await request.Image.CopyToAsync(originalImageStream, cancellationToken);
    await request.Image.CopyToAsync(webpImageStream, cancellationToken);

    originalImageStream.Position = 0;
    webpImageStream.Position = 0;

    CloudBlockBlob originalImageBlob = blobContainer.GetBlockBlobReference($"originals/{originalImageId}");
    CloudBlockBlob webpImageBlob = blobContainer.GetBlockBlobReference($"webp/{webpImageId}");

    originalImageBlob.Properties.ContentType = request.Image.ContentType;
    webpImageBlob.Properties.ContentType = "image/webp";

    await originalImageBlob.UploadFromStreamAsync(originalImageStream);

    var webpCopy = SKData.CreateCopy(webpImageStream.GetBuffer());
    SKData webpImageEncoded = SKImage.FromEncodedData(webpCopy).Encode(SKEncodedImageFormat.Webp, 50);

    await webpImageBlob.UploadFromStreamAsync(webpImageEncoded.AsStream());

    var originalImage = new Image
    {
      Id = originalImageId,
      BlobUri = originalImageBlob.Uri,
      CdnUri = azureProvider.GetCdnUri(originalImageBlob.Uri),
      ContentType = request.Image.ContentType,
      Uploaded = dateTimeProvider.UtcNow,
      Uploader = request.Uploader,
      LocationId = request.LocationId,
      ReviewId = request.ReviewId
    };

    var webpImage = new Image
    {
      Id = webpImageId,
      BlobUri = webpImageBlob.Uri,
      CdnUri = azureProvider.GetCdnUri(webpImageBlob.Uri),
      ContentType = "image/webp",
      Uploaded = dateTimeProvider.UtcNow,
      Uploader = request.Uploader,
      LocationId = request.LocationId,
      ReviewId = request.ReviewId,
      OriginalImageId = originalImageId
    };

    dataContext.Images.Add(originalImage);
    dataContext.Images.Add(webpImage);
    await dataContext.SaveChangesAsync(cancellationToken);

    return new ImageStorageResult(originalImage, webpImage);
  }
}
