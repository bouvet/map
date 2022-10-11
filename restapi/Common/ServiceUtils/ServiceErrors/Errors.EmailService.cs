using ErrorOr;

namespace restapi.Common.ServiceUtils.ServiceErrors;

public static partial class Errors
{
  public static class EmailService
  {
    public static Error SendingEmailFailed => Error.Failure(
      code: "EmailService.SendingEmailFailed",
      description: "Sending email failed, please try again"
    );
  }
}