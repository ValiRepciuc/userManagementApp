using FirstProject.Application.Interfaces.Repositories;
using FirstProject.Domain.Entities;
using FirstProject.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace FirstProject.Infrastructure.Repositories;

public class UserPermissionsRepository : BaseRepository<Permissions>, IUserPermissionsRepository
{
    private readonly DatabaseContext _context;
    public UserPermissionsRepository(DatabaseContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<Permissions>> GetPermissionsByUserId(int userId)
    {
        return await _context.UserPermissions
            .Where(p => p.UserId == userId)
            .ToListAsync();
    }
}