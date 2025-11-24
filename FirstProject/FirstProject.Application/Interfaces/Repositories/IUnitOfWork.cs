namespace FirstProject.Application.Interfaces.Repositories;

public interface IUnitOfWork
{
    IUserRepository User { get; }
    IUserPermissionsRepository UserPermissions { get; }
    public Task<bool> SaveChangesAsync();
}