namespace Infrastructure.Exceptions.User;

public class UserOverAgeException : Exception 

{
    public UserOverAgeException() : base("You are too old!")
    {
        
    }
}