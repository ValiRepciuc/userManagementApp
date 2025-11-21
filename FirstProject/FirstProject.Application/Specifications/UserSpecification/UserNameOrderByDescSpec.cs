using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserNameOrderByDescSpec : BaseSpecification<User>
{
    public UserNameOrderByDescSpec(string name) : base (x => x.name.Contains(name))
    {
        ApplyOrderByDescending(x => x.name);
    }
}