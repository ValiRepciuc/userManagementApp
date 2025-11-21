using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserNameOrderBySpec : BaseSpecification<User>
{
    public UserNameOrderBySpec(string name) : base (x => x.name.Contains(name))
    {
        ApplyOrderBy(x => x.name);
    }
}