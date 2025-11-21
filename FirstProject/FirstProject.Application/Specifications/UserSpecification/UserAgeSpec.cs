using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserAgeSpec : BaseSpecification<User>
{
    public UserAgeSpec(int age)
        : base(x =>
            x.birthDate <= DateOnly.FromDateTime(DateTime.Today.AddYears(-age)) &&
            x.birthDate > DateOnly.FromDateTime(DateTime.Today.AddYears(-(age + 1)))
        )
    {
    }

}