namespace Infrastructure.Exceptions.Phone;

public class PhoneAlreadyExistsException : Exception
{
    public PhoneAlreadyExistsException(string phone) : base($"The phone number {phone} already exists.")
    {
        
    }
}