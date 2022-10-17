using ErrorOr;

namespace restapi.Common.ServiceUtils.ServiceErrors;

public static partial class Errors
{
  public static class ImageProvider
  {
    public static Error ConvertionFail => Error.Unexpected(
     code: "ImageProvider.ConvertionFail",
     description: "Converting image to webp failed!"
   );
  }
}