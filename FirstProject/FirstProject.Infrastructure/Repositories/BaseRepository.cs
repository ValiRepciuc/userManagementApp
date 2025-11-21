using System.Linq.Expressions;
using FirstProject.Application.Interfaces.Repositories;
using FirstProject.Application.Interfaces.Specification;
using FirstProject.Domain.Entities;
using FirstProject.Infrastructure.DbContexts;
using FirstProject.Infrastructure.Specifications;
using Microsoft.EntityFrameworkCore;

namespace FirstProject.Infrastructure.Repositories;

public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity, new(){

    private readonly DbSet<TEntity> _dbSet;
    private readonly DatabaseContext _context;
    private IBaseRepository<TEntity> _baseRepositoryImplementation;

    public BaseRepository(DatabaseContext context)
    {
        _context = context;
        _dbSet = context.Set<TEntity>();
    }
    
    protected IQueryable<TEntity> Get(bool includeDeleted = false)
    {
        return includeDeleted
            ? _dbSet.IgnoreQueryFilters()
            : _dbSet;
    }
    
    public void Add(TEntity entity)
    {
        _context.Add(entity);
    }

    public void AddRange(IEnumerable<TEntity> entities)
    {
        foreach (var entity in entities)
            Add(entity);
    }

    public void Delete(TEntity entity, bool removeFromDb = false)
    {
        entity.DeletedAt = DateTime.UtcNow;
    }

    public void DeleteRange(IEnumerable<TEntity> entities, bool removeFromDb = false)
    {
        foreach (var entity in entities)
            Delete(entity, removeFromDb);
    }

    public async Task<TEntity> GetByIdAsync(int id, bool includeDeleted = false)
    {
        return await Get(includeDeleted).FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<List<TEntity>> GetAllByIdsAsync(IEnumerable<int> ids, bool includeDeleted = false)
    {
        return await Get(includeDeleted).Where(e => ids.Contains(e.Id)).ToListAsync();
    }

    public async Task<Dictionary<TKey, TEntity>> GetAllByIdsAsync<TKey>(IEnumerable<int> ids, Func<TEntity, TKey> keySelector, bool includeDeleted = false)
    {
        return await Get(includeDeleted).Where(e => ids.Contains(e.Id)).ToDictionaryAsync(keySelector);
    }
    
    public async Task<List<TEntity>> GetAllAsync(bool includeDeleted = false)
    {
        return await Get(includeDeleted).ToListAsync();
    }

    public async Task<List<TEntity>> GetAllAsync<TKey>(Expression<Func<TEntity, TKey>> orderBy, bool descending = false)
    {
        return descending
            ? await Get().OrderByDescending(orderBy).ToListAsync()
            : await Get().OrderBy(orderBy).ToListAsync();
    }

    public async Task<int> CountAsync(Expression<Func<TEntity, bool>> expression)
    {
        return await Get().CountAsync(expression);
    }

    public void Update(TEntity entity)
    {
        _dbSet.Update(entity);
    }

    public async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> expression)
    {
        return await _dbSet.AnyAsync(expression);
    }

    public async Task<IEnumerable<TEntity>> GetAllSpecAsync(ISpecification<TEntity> specification = null)
    {
        return ApplySpecificationForList(specification);
    }

    public async Task<TEntity> FindAsync(ISpecification<TEntity> specification = null)
    {
        return await ApplySpecificationForList(specification).FirstOrDefaultAsync();
    }
    private IQueryable<TEntity> ApplySpecificationForList(ISpecification<TEntity> spec)
    {
        return SpecificationEvaluator<TEntity>.GetQuery(_dbSet.AsQueryable(), spec);
    }
   
}