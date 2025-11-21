using FirstProject.Application.Interfaces.Repositories;
using FirstProject.Domain.Entities;
using FirstProject.Infrastructure.DbContexts;

namespace FirstProject.Infrastructure.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(DatabaseContext context) : base(context)
    {
    }
}