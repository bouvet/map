using ErrorOr;
using Microsoft.WindowsAzure.Storage.Blob;

namespace restapi.Common.Services.Storage;

public interface IAzureBlobStorage
{
  Task<ErrorOr<CloudBlockBlob>> UploadFile(IFormFile file);
  Task<ErrorOr<Deleted>> DeleteFile(Guid id);
}