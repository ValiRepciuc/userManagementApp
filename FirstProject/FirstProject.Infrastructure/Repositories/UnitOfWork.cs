using FirstProject.Application.Interfaces.Repositories;
using FirstProject.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace FirstProject.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly DatabaseContext _context;

    public IUserRepository User { get; }
    public IUserPermissionsRepository UserPermissions { get; }

    public UnitOfWork(DatabaseContext context)
    {
        _context = context;
        User = new UserRepository(context);
        UserPermissions = new UserPermissionsRepository(context);
    }

    public async Task<bool> SaveChangesAsync()
    {
        var save = await _context.SaveChangesAsync();
        return save >= 0;
    }
}