using ErrorOr;

namespace restapi.Common.ServiceUtils.ServiceErrors;

public static partial class Errors
{
    public static class Session
    {
        public static Error NotFound => Error.NotFound(
            code: "Session.NotFound",
            description: "Session with given id was not found."
        );
    }
}