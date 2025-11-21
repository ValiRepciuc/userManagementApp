using FirstProject.Application.Helpers;
using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserAgeOrderSpec : BaseSpecification<User>
{
    public UserAgeOrderSpec()
    {
        ApplyOrderByDescending(x => x.birthDate);
    }
}