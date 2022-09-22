using ErrorOr;
using Microsoft.WindowsAzure.Storage.Blob;

namespace restapi.Services.AzureBlobStorage;

public interface IAzureBlobStorageService
{
  Task<ErrorOr<CloudBlockBlob>> UploadFile(IFormFile image);
}