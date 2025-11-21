using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserAgeOrderDescSpec : BaseSpecification<User>
{
    public UserAgeOrderDescSpec()
    {
        ApplyOrderBy(x => x.birthDate);
    }
}