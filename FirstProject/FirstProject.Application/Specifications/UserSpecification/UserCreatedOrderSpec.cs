using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserCreatedOrderSpec : BaseSpecification<User>
{
    public UserCreatedOrderSpec()
    {
        ApplyOrderBy(x => x.CreatedAt);
    }
}