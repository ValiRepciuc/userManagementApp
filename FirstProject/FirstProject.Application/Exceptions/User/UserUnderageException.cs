namespace Infrastructure.Exceptions.User;

public class UserUnderageException : Exception
{
    public UserUnderageException() : base("You are not old enough!")
    {
        
    }
}