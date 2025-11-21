namespace Infrastructure.Exceptions.Email;

public class EmailNotValidException : Exception
{
    public EmailNotValidException(string email) : base ($"The email {email} is not valid!")
    {
        
    }
}