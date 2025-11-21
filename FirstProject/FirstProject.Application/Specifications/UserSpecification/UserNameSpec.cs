using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserNameSpec : BaseSpecification<User>
{
    public UserNameSpec(string userName) : base(x => x.name.Contains(userName))
    {
        
    }
}