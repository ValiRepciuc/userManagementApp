using FirstProject.Domain.Entities;

namespace FirstProject.Application.Interfaces.Repositories;

public interface IUserPermissionsRepository : IBaseRepository<Permissions>
{
    public Task<List<Permissions>> GetPermissionsByUserId(int userId);

}