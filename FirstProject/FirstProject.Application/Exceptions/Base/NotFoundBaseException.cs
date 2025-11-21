namespace Infrastructure.Exceptions.Base;

public class NotFoundBaseException : Exception
{
    public NotFoundBaseException(string msg) : base(msg)
    {
    }
}