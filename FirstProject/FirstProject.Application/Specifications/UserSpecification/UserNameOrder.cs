using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserNameOrder : BaseSpecification<User>
{
    public UserNameOrder()
    {
        ApplyOrderBy(x => x.name);
    }
}