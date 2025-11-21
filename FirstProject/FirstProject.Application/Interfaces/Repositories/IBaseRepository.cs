using System.Linq.Expressions;
using FirstProject.Application.Interfaces.Specification;
using FirstProject.Domain.Entities;

namespace FirstProject.Application.Interfaces.Repositories;

public interface IBaseRepository<TEntity> where TEntity : BaseEntity
{
    void Add(TEntity entity);
    void AddRange(IEnumerable<TEntity> entities);
    void Delete(TEntity entity, bool removeFromDb = false);
    void DeleteRange(IEnumerable<TEntity> entities, bool removeFromDb = false);
    Task<TEntity> GetByIdAsync(int id, bool includeDeleted = false);
    Task<List<TEntity>> GetAllByIdsAsync(IEnumerable<int> ids, bool includeDeleted = false);
    Task<Dictionary<TKey, TEntity>> GetAllByIdsAsync<TKey>(IEnumerable<int> ids, Func<TEntity, TKey> keySelector, bool includeDeleted = false);
    Task<List<TEntity>> GetAllAsync(bool includeDeleted = false);
    Task<int> CountAsync(Expression<Func<TEntity, bool>> expression);
    void Update(TEntity entity);
    Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> expression);
    Task<IEnumerable<TEntity>> GetAllSpecAsync(ISpecification<TEntity> specification = null);
    Task<TEntity> FindAsync(ISpecification<TEntity> specification = null);
}
