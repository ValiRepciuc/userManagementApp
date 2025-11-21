namespace Infrastructure.Exceptions.Phone;

public class PhoneNotValidException : Exception
{
    public PhoneNotValidException(string phone) : base($"Phone number is not valid: {phone}")
    {
        
    }
}