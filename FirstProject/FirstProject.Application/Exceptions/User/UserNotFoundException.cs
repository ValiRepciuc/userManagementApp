using Infrastructure.Exceptions.Base;

namespace Infrastructure.Exceptions.User;

public class UserNotFoundException : NotFoundBaseException
{
    public UserNotFoundException(int id) : base($"User with id '{id}' was not found")
    {
    }
}