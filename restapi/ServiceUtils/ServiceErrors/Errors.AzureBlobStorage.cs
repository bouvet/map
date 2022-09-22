using ErrorOr;

namespace restapi.ServiceUtils.ServiceErrors;

public static partial class Errors
{
  public static class AzureBlobStorage
  {
    public static Error UploadFailed => Error.Failure(
      code: "AzureBlobStorage.UploadFailed",
      description: "Uploading file to storage failed."
    );
  }
}