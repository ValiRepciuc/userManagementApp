using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserNameOrderDesc : BaseSpecification<User>
{
    public UserNameOrderDesc()
    {
        ApplyOrderByDescending(x => x.name);
    }
}