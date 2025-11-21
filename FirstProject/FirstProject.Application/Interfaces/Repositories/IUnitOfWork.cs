namespace FirstProject.Application.Interfaces.Repositories;

public interface IUnitOfWork
{
    IUserRepository User { get; }
    public Task<bool> SaveChangesAsync();
}