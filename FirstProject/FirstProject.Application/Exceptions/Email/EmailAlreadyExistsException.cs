namespace Infrastructure.Exceptions.Email;

public class EmailAlreadyExistsException : Exception
{
    public EmailAlreadyExistsException(string email) : base($"The email {email} already exists.")
    {
        
    }
}