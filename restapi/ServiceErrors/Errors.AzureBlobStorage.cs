using ErrorOr;

namespace restapi.ServiceErrors;

public static partial class Errors
{
  public static class AzureBlobStorage
  {
    public static Error UploadFailed => Error.Failure(
      code: "AzureBlobStorage.UploadFailed",
      description: "Uploading file to storage failed, please try again"
    );
  }
}