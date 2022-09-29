using ErrorOr;
using Microsoft.WindowsAzure.Storage.Blob;

namespace restapi.Common.Services;

public interface IAzureBlobStorage
{
  Task<ErrorOr<CloudBlockBlob>> UploadFile(IFormFile image);
  Task<ErrorOr<Deleted>> DeleteFile(Guid id);
}