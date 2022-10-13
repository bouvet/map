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

    public static Error AlreadyRegistered => Error.Conflict(
      code: "EmailService.AlreadyRegistered",
      description: "Email has already been registered"
    );

    public static Error NotFound => Error.NotFound(
      code: "EmailService.NotFound",
      description: "Email does not exist"
    );

    public static Error WrongConfirmationCode => Error.Validation(
      code: "EmailService.WrongConfirmationCode",
      description: "Given confirmation code is wrong"
    );

    public static Error CodeExpired => Error.Validation(
      code: "EmailService.CodeExpired",
      description: "Given confirmation code has expired"
    );

    public static Error CodeConfirmed => Error.Conflict(
      code: "EmailService.CodeConfirmed",
      description: "Email has been confirmed, can't delete"
    );

    public static Error EmailNotConfirmed => Error.Conflict(
      code: "EmailService.EmailNotConfirmed",
      description: "Email has not been confirmed, can't register yet"
    );
  }
}