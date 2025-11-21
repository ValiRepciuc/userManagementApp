using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserCreatedOrderDescSpec : BaseSpecification<User>
{
    public UserCreatedOrderDescSpec()
    {
        ApplyOrderByDescending(x => x.CreatedAt);
    }
}